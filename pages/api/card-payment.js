// pages/api/card-payment.js
// Démarre un paiement carte via GeniusPay pour une commande déjà créée
// (voir /api/orders/create). Ne crée jamais de commande lui-même.
import { getAdminDb } from '../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { orderId } = req.body || {};
  if (!orderId) return res.status(400).json({ success: false, message: 'orderId mancante' });

  const GP_PROXY = process.env.GENIUSPAY_PROXY_URL;
  const GP_API_KEY = process.env.GENIUSPAY_API_KEY;
  const GP_API_SECRET = process.env.GENIUSPAY_API_SECRET;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.palletstock.com';

  if (!GP_PROXY || !GP_API_KEY || !GP_API_SECRET) {
    return res.status(503).json({ success: false, message: 'Pagamento con carta non configurato' });
  }

  try {
    const db = getAdminDb();
    const orderRef = db.collection('orders').doc(orderId);
    const orderSnap = await orderRef.get();
    if (!orderSnap.exists) {
      return res.status(404).json({ success: false, message: 'Ordine non trovato' });
    }
    const order = orderSnap.data();

    const gpRes = await fetch(`${GP_PROXY}/api/v1/merchant/payments`, {
      method: 'POST',
      headers: {
        'X-API-Key': GP_API_KEY,
        'X-API-Secret': GP_API_SECRET,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: parseFloat(order.amount),
        currency: order.currency || 'EUR',
        description: `Pallet Stock — ordine ${orderId} (${order.items.length} articolo/i)`,
        customer: {
          name: `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim(),
          email: order.customer?.email,
          phone: order.customer?.phone
        },
        success_url: `${BASE_URL}/ordine-confermato?ref=${orderId}&method=card`,
        error_url: `${BASE_URL}/checkout?ref=${orderId}&error=1`,
        metadata: {
          order_id: orderId,
          order_reference: orderId,
          gp_reference: orderId,
          source: 'palletstock'
        }
      })
    });

    const contentType = gpRes.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const raw = await gpRes.text();
      console.error('GeniusPay non-JSON response:', raw.slice(0, 300));
      return res.status(502).json({ success: false, message: 'Errore del servizio di pagamento' });
    }

    const gpData = await gpRes.json();
    if (!gpRes.ok || !gpData.success) {
      return res.status(502).json({ success: false, message: gpData?.error?.message || 'Pagamento non disponibile' });
    }

    const gpPayment = gpData.data;
    const gpReference = gpPayment.reference || gpPayment.payment_reference || gpPayment.id || orderId;
    const redirectUrl = gpPayment.checkout_url || gpPayment.payment_url;

    await orderRef.update({
      gpReference,
      updatedAt: FieldValue.serverTimestamp()
    });

    if (!redirectUrl) {
      // Cas rare : paiement immédiat sans redirection
      return res.status(200).json({ success: true, redirect: false, orderId });
    }

    return res.status(200).json({ success: true, redirect: true, redirectUrl, orderId });
  } catch (err) {
    console.error('Card payment error:', err);
    return res.status(500).json({ success: false, message: 'Errore del server' });
  }
}
