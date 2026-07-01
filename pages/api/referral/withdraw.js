import { getAdminDb } from '../../../lib/firebaseAdmin';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token manquant' });

  try {
    const db = getAdminDb();
    const decoded = await getAuth().verifyIdToken(authHeader.slice(7));
    const uid = decoded.uid;

    const { accountName, iban, bic, amount } = req.body || {};
    if (!accountName || !iban || !amount)
      return res.status(400).json({ error: 'Données incomplètes' });

    // Vérifier le solde côté serveur
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    const balance = userDoc.exists ? (userDoc.data().referralBalance || 0) : 0;

    if (balance < 1000)
      return res.status(400).json({ error: 'Solde insuffisant (minimum 1000€)' });

    // Vérifier aucune demande pending
    const pending = await db.collection('withdrawalRequests')
      .where('uid', '==', uid)
      .where('status', '==', 'pending')
      .limit(1).get();
    if (!pending.empty)
      return res.status(400).json({ error: 'Demande déjà en attente' });

    const batch = db.batch();

    // Créer la demande
    const reqRef = db.collection('withdrawalRequests').doc();
    const request = {
      uid,
      email: decoded.email || '',
      accountName,
      iban,
      bic: bic || '',
      amount: balance,
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
    };
    batch.set(reqRef, request);

    // Remettre le solde à 0
    batch.update(userRef, { referralBalance: 0 });

    await batch.commit();

    // Notifier l'admin
    if (process.env.ADMIN_EMAIL) {
      const { sendBrevoEmail } = await import('../../../lib/brevo');
      await sendBrevoEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `💸 Demande de retrait — €${balance.toFixed(2)}`,
        html: `<p><b>${accountName}</b> (${decoded.email}) demande un virement de <b>€${balance.toFixed(2)}</b>.<br>IBAN : ${iban}${bic ? ` / BIC : ${bic}` : ''}</p>`,
      });
    }

    return res.json({ ok: true, request: { ...request, createdAt: new Date().toISOString() } });
  } catch (e) {
    console.error('Withdrawal error:', e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
