// pages/api/geniuspay-webhook.js
import { getAdminDb } from '../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendBrevoEmail, emailPaymentReceived, emailPaymentFailed } from '../../lib/brevo';

const STATUS_MAP = {
  'payment.success': { status: 'processing', paymentStatus: 'paid' },
  'payment.completed': { status: 'processing', paymentStatus: 'paid' },
  'payment.failed': { status: 'payment_failed', paymentStatus: 'failed' },
  'payment.cancelled': { status: 'payment_failed', paymentStatus: 'cancelled' },
  'payment.expired': { status: 'payment_failed', paymentStatus: 'expired' },
  completed: { status: 'processing', paymentStatus: 'paid' },
  success: { status: 'processing', paymentStatus: 'paid' },
  paid: { status: 'processing', paymentStatus: 'paid' },
  failed: { status: 'payment_failed', paymentStatus: 'failed' },
  cancelled: { status: 'payment_failed', paymentStatus: 'cancelled' },
  expired: { status: 'payment_failed', paymentStatus: 'expired' }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  console.log('📥 GeniusPay webhook received');
  const db = getAdminDb();

  const body = req.body || {};
  const event = (body.event || body.status || '').toLowerCase();
  const data = body.data || body;

  const reference =
    data?.reference || data?.metadata?.order_reference || data?.metadata?.order_id;

  if (event === 'webhook.test') {
    return res.status(200).json({ received: true, test: true });
  }

  const newStatus = STATUS_MAP[event];
  if (!newStatus) {
    console.log('⚠️ Unknown event/status:', event);
    return res.status(200).json({ received: true });
  }

  try {
    const ordersRef = db.collection('orders');
    let orderDoc = null;
    let orderData = null;

    if (reference) {
      const direct = await ordersRef.doc(reference).get();
      if (direct.exists) {
        orderDoc = direct;
        orderData = direct.data();
      } else {
        const snap = await ordersRef.where('gpReference', '==', reference).limit(1).get();
        if (!snap.empty) {
          orderDoc = snap.docs[0];
          orderData = orderDoc.data();
        }
      }
    }

    if (!orderDoc) {
      console.log('❌ Order not found for reference:', reference);
      return res.status(200).json({ received: true, note: 'order not found' });
    }

    if (orderData.paymentStatus === 'paid' && newStatus.paymentStatus === 'paid') {
      return res.status(200).json({ ignored: true });
    }

    await orderDoc.ref.update({
      ...newStatus,
      gpReference: reference || orderData.gpReference,
      updatedAt: FieldValue.serverTimestamp(),
      geniuspayData: data
    });

    const email = orderData.customer?.email;
    if (email) {
      if (newStatus.paymentStatus === 'paid') {
        await sendBrevoEmail({
          to: email,
          subject: `Pagamento confermato — ${orderData.orderId}`,
          html: emailPaymentReceived({ orderId: orderData.orderId, total: orderData.amount })
        });
      } else {
        await sendBrevoEmail({
          to: email,
          subject: `Pagamento non riuscito — ${orderData.orderId}`,
          html: emailPaymentFailed({ orderId: orderData.orderId })
        });
      }
    }

    return res.status(200).json({ received: true, updated: orderData.orderId });
  } catch (err) {
    console.error('🔥 Webhook error:', err);
    return res.status(500).json({ error: err.message });
  }
}
