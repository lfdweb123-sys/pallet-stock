// pages/api/nowpayments-ipn.js — Webhook NowPayments + notifications Brevo
import crypto from 'crypto';
import { getAdminDb } from '../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendBrevoEmail, emailPaymentReceived, emailPaymentFailed } from '../../lib/brevo';

function sortObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = sortObject(obj[key]);
    return acc;
  }, {});
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const db = getAdminDb();

  // Vérification signature HMAC
  const signature = req.headers['x-nowpayments-sig'];
  const sortedBody = JSON.stringify(sortObject(req.body));
  const hmac = crypto
    .createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET || '')
    .update(sortedBody)
    .digest('hex');

  if (signature && hmac !== signature) {
    console.warn('Invalid NowPayments IPN signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { payment_id, payment_status, order_id } = req.body;
  console.log(`NowPayments IPN: payment_id=${payment_id}, order_id=${order_id}, status=${payment_status}`);

  try {
    const isPaid = ['finished', 'confirmed'].includes(payment_status);
    const isFailed = ['failed', 'expired'].includes(payment_status);

    let orderRef = order_id ? db.collection('orders').doc(order_id) : null;
    let orderSnap = orderRef ? await orderRef.get() : null;

    if (!orderSnap || !orderSnap.exists) {
      // Fallback : recherche par npInvoiceId / paymentId déjà stocké
      const q = await db.collection('orders').where('npInvoiceId', '==', payment_id).limit(1).get();
      if (q.empty) {
        console.warn('Order not found for NowPayments IPN');
        return res.status(200).json({ received: true, note: 'order not found' });
      }
      orderRef = q.docs[0].ref;
      orderSnap = q.docs[0];
    }

    const order = orderSnap.data();

    if (order.paymentStatus === 'paid' && isPaid) {
      return res.status(200).json({ received: true, ignored: true });
    }

    await orderRef.update({
      paymentStatus: payment_status,
      updatedAt: FieldValue.serverTimestamp(),
      nowpaymentsData: req.body,
      ...(isPaid ? { status: 'processing', paymentStatus: 'paid' } : {}),
      ...(isFailed ? { status: 'payment_failed' } : {})
    });

    if (isPaid) {
      const email = order.customer?.email;
      if (email) {
        await sendBrevoEmail({
          to: email,
          subject: `Pagamento confermato — ${order.orderId}`,
          html: emailPaymentReceived({ orderId: order.orderId, total: order.amount })
        });
      }
      if (process.env.ADMIN_EMAIL) {
        await sendBrevoEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `₿ Pagamento crypto confermato — ${order.orderId}`,
          html: emailPaymentReceived({ orderId: order.orderId, total: order.amount })
        });
      }
    } else if (isFailed) {
      const email = order.customer?.email;
      if (email) {
        await sendBrevoEmail({
          to: email,
          subject: `Pagamento non riuscito — ${order.orderId}`,
          html: emailPaymentFailed({ orderId: order.orderId })
        });
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('IPN handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
