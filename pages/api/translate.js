// pages/api/translate.js
// Traduction à la volée via DeepL — utile pour traduire du contenu
// dynamique (ex. un message de support) hors des dictionnaires statiques
// de lib/i18n.js qui couvrent déjà toute l'interface (IT/FR/EN).
const DEEPL_TARGET_MAP = { it: 'IT', fr: 'FR', en: 'EN-GB' };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, target } = req.body || {};
  if (!text || !target) return res.status(400).json({ error: 'Missing text or target' });

  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'DEEPL_API_KEY not configured' });

  const targetLang = DEEPL_TARGET_MAP[target] || target.toUpperCase();
  const url = process.env.DEEPL_API_URL || 'https://api-free.deepl.com/v2/translate';

  try {
    const params = new URLSearchParams();
    params.append('auth_key', apiKey);
    params.append('text', text);
    params.append('target_lang', targetLang);

    const dlRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    if (!dlRes.ok) {
      const errText = await dlRes.text();
      console.error('DeepL error:', errText);
      return res.status(502).json({ error: 'DeepL API error' });
    }

    const data = await dlRes.json();
    const translated = data?.translations?.[0]?.text || '';
    return res.status(200).json({ translated });
  } catch (err) {
    console.error('Translate handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
