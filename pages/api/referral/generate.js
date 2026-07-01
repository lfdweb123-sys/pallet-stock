// pages/api/referral/generate.js
// Génère (ou retourne l'existant) un code de parrainage unique pour l'utilisateur.
// Requiert un Firebase ID token dans Authorization: Bearer <token>.
import { getAdminDb } from '../../../lib/firebaseAdmin';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue } from 'firebase-admin/firestore';

// Caractères sans ambiguïté visuelle (pas 0/O, 1/I/L)
const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function makeCode() {
  let s = 'PS';
  for (let i = 0; i < 6; i++) s += CHARS[Math.floor(Math.random() * CHARS.length)];
  return s; // ex: "PSAB34XY"
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    // Vérifier le token Firebase
    const db = getAdminDb(); // déclenche l'initialisation admin
    const decoded = await getAuth().verifyIdToken(authHeader.slice(7));
    const uid = decoded.uid;

    // Si l'utilisateur a déjà un code → le retourner directement
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    if (userDoc.exists && userDoc.data().referralCode) {
      return res.json({ code: userDoc.data().referralCode });
    }

    // Générer un code unique (max 10 tentatives)
    let code = null;
    for (let i = 0; i < 10; i++) {
      const candidate = makeCode();
      const existing = await db.collection('referralCodes').doc(candidate).get();
      if (!existing.exists) { code = candidate; break; }
    }
    if (!code) return res.status(500).json({ error: 'Impossible de générer un code unique' });

    // Sauvegarder dans users/{uid} et referralCodes/{code}
    const batch = db.batch();
    batch.set(userRef, {
      referralCode: code,
      referralBalance: 0,
    }, { merge: true });
    batch.set(db.collection('referralCodes').doc(code), {
      uid,
      createdAt: FieldValue.serverTimestamp(),
    });
    await batch.commit();

    return res.json({ code });
  } catch (e) {
    console.error('Referral generate error:', e);
    if (e.code === 'auth/id-token-expired' || e.code === 'auth/argument-error') {
      return res.status(401).json({ error: 'Token invalide' });
    }
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
