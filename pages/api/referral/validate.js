// pages/api/referral/validate.js
// Vérifie qu'un code de parrainage existe dans Firestore.
// Retourne { valid: true } ou { valid: false } — aucune info sensible exposée.
import { getAdminDb } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const code = (req.query.code || '').trim().toUpperCase();
  if (!code || code.length < 4) return res.json({ valid: false });

  try {
    const db = getAdminDb();
    const snap = await db.collection('referralCodes').doc(code).get();
    return res.json({ valid: snap.exists });
  } catch (e) {
    console.error('Referral validate error:', e);
    return res.status(500).json({ valid: false });
  }
}
