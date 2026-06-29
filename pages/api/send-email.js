// pages/api/send-email.js
// Endpoint interne générique pour envoyer un email via Brevo
// (utilisable pour des notifications futures, relances, etc.)
import { sendBrevoEmail } from '../../lib/brevo';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { to, subject, html } = req.body || {};
  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (!process.env.BREVO_API_KEY) {
    return res.status(503).json({ error: 'BREVO_API_KEY not configured' });
  }
  try {
    await sendBrevoEmail({ to, subject, html });
    return res.status(200).json({ sent: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
