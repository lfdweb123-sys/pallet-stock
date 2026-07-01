// pages/api/orders/create.js
// Crée la commande dans Firestore. Les prix sont RECALCULÉS côté serveur
// à partir du catalogue (lib/products.js) — on ne fait jamais confiance
// aux prix envoyés par le navigateur.
// Si un code de parrainage valide est fourni (méthode carte ou crypto),
// applique −10% au total et crédite le parrain.
import { getAdminDb } from '../../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { getProductBySlug } from '../../../lib/products';
import { sendBrevoEmail, emailOrderConfirmationAdmin, emailBankTransferInstructions } from '../../../lib/brevo';

const REFERRAL_RATE = 0.10; // 10 %

function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PS-${ts}-${rand}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { customer, items, paymentMethod, locale, uid, referralCode } = req.body || {};

  if (!customer?.email || !customer?.firstName || !customer?.address) {
    return res.status(400).json({ error: 'Dati cliente incompleti' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Carrello vuoto' });
  }
  if (!['card', 'crypto', 'bank'].includes(paymentMethod)) {
    return res.status(400).json({ error: 'Metodo di pagamento non valido' });
  }

  // ── Recalcul sécurisé des lignes depuis le catalogue ──────────────────
  const resolvedItems = [];
  for (const it of items) {
    const product = getProductBySlug(it.slug);
    if (!product) return res.status(400).json({ error: `Prodotto non trovato: ${it.slug}` });
    const qty = Math.max(1, Math.min(50, parseInt(it.qty, 10) || 1));
    resolvedItems.push({
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      price: product.price,
      qty,
    });
  }

  const catalogTotal = resolvedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  if (catalogTotal <= 0) return res.status(400).json({ error: 'Totale non valido' });

  // ── Parrainage : validation du code (carte / crypto uniquement) ────────
  let referrerId = null;
  let discount = 0;
  let finalTotal = catalogTotal;

  const normalizedCode = (referralCode || '').trim().toUpperCase();
  const referralEligible = ['card', 'crypto'].includes(paymentMethod);

  if (normalizedCode && referralEligible) {
    try {
      const db = getAdminDb();
      const codeDoc = await db.collection('referralCodes').doc(normalizedCode).get();
      if (codeDoc.exists) {
        const referrerUid = codeDoc.data().uid;
        // Anti-auto-parrainage : le parrain ne peut pas bénéficier de son propre code
        if (referrerUid && referrerUid !== uid) {
          referrerId = referrerUid;
          discount = Math.round(catalogTotal * REFERRAL_RATE * 100) / 100;
          finalTotal = Math.round((catalogTotal - discount) * 100) / 100;
        }
      }
    } catch (e) {
      console.error('Referral lookup error:', e);
      // Ne pas bloquer la commande en cas d'erreur de parrainage
    }
  }

  try {
    const db = getAdminDb();
    const orderId = generateOrderId();

    const orderData = {
      orderId,
      customer,
      uid: uid || null,
      items: resolvedItems,
      catalogAmount: catalogTotal,
      discount,
      amount: finalTotal,
      currency: 'EUR',
      paymentMethod,
      paymentStatus: paymentMethod === 'bank' ? 'awaiting_transfer' : 'pending',
      status: paymentMethod === 'bank' ? 'pending_bank_transfer' : 'pending_payment',
      locale: locale || 'it',
      ...(referrerId && { referralCode: normalizedCode, referrerId }),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await db.collection('orders').doc(orderId).set(orderData);

    // ── Créditer le parrain et logguer la transaction ──────────────────
    // Note : pour plus de sécurité en production, déplacer ce crédit dans
    // le webhook de confirmation de paiement (card/crypto).
    if (referrerId && discount > 0) {
      const batch = db.batch();

      // Incrémenter le solde du parrain
      batch.set(
        db.collection('users').doc(referrerId),
        { referralBalance: FieldValue.increment(discount) },
        { merge: true }
      );

      // Enregistrer la transaction de parrainage
      const refDoc = db.collection('referrals').doc();
      batch.set(refDoc, {
        referrerId,
        referralCode: normalizedCode,
        refereeEmail: customer.email,
        refereeUid: uid || null,
        orderId,
        catalogAmount: catalogTotal,
        commission: discount,
        paymentMethod,
        status: 'pending', // → 'confirmed' après webhook paiement
        createdAt: FieldValue.serverTimestamp(),
      });

      await batch.commit();
    }

    // ── Notifications email ────────────────────────────────────────────
    if (process.env.ADMIN_EMAIL) {
      await sendBrevoEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `🧾 Nuovo ordine creato — ${orderId}`,
        html: emailOrderConfirmationAdmin({
          orderId, customer, items: resolvedItems, total: finalTotal, paymentMethod,
        }),
      });
    }

    if (paymentMethod === 'bank' && customer?.email) {
      await sendBrevoEmail({
        to: customer.email,
        subject: `Istruzioni di pagamento — Ordine ${orderId}`,
        html: emailBankTransferInstructions({ orderId, total: finalTotal }),
      });
    }

    return res.status(200).json({ orderId, total: finalTotal, discount });
  } catch (err) {
    console.error('Order create error:', err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
}
