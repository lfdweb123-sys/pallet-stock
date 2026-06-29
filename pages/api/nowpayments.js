// pages/api/nowpayments.js
// Crée une facture crypto NowPayments pour une commande déjà créée.
import { getAdminDb } from '../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { orderId, pay_currency } = req.body || {};
  if (!orderId) return res.status(400).json({ error: 'orderId mancante' });

  const NP_API_KEY = process.env.NOWPAYMENTS_API_KEY;
  if (!NP_API_KEY) return res.status(503).json({ error: 'Pagamento crypto non configurato' });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.palletstock.com';
  const SUCCESS_URL = `${BASE_URL}/ordine-confermato?ref=${orderId}&method=crypto`;
  const CANCEL_URL = `${BASE_URL}/checkout?ref=${orderId}&error=1`;
  const IPN_URL = `${BASE_URL}/api/nowpayments-ipn`;

  try {
    const db = getAdminDb();
    const orderRef = db.collection('orders').doc(orderId);
    const orderSnap = await orderRef.get();
    if (!orderSnap.exists) return res.status(404).json({ error: 'Ordine non trovato' });
    const order = orderSnap.data();

    const npRes = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': NP_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_amount: parseFloat(order.amount).toFixed(2),
        price_currency: (order.currency || 'eur').toLowerCase(),
        pay_currency: (pay_currency || 'btc').toLowerCase(),
        order_id: orderId,
        order_description: `Pallet Stock — ordine ${orderId}`,
        ipn_callback_url: IPN_URL,
        success_url: SUCCESS_URL,
        cancel_url: CANCEL_URL,
        is_fixed_rate: true,
        is_fee_paid_by_user: false,
        customer_email: order.customer?.email || undefined
      })
    });

    const data = await npRes.json();
    if (!npRes.ok) {
      console.error('NowPayments error:', data);
      return res.status(502).json({ message: data.message || 'Errore API NowPayments' });
    }

    await orderRef.update({
      npInvoiceId: data.id,
      updatedAt: FieldValue.serverTimestamp()
    });

    return res.status(200).json({
      invoice_id: data.id,
      invoice_url: data.invoice_url,
      payment_status: data.payment_status,
      orderId
    });
  } catch (err) {
    console.error('NowPayments handler error:', err);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
}
