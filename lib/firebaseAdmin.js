// lib/firebaseAdmin.js
// Initialisation Firebase Admin — utilisée UNIQUEMENT dans les routes /api.
// Les identifiants viennent des variables d'environnement Vercel,
// jamais d'un fichier de clé committé dans le repo.
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export function initFirebaseAdmin() {
  if (getApps().length) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Variables Firebase Admin manquantes (FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY)');
  }

  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey })
  });
}

export function getAdminDb() {
  initFirebaseAdmin();
  return getFirestore();
}
