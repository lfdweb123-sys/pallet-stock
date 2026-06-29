// pages/api/orders/create.js
// Crée la commande dans Firestore. Les prix sont RECALCULÉS côté serveur
// à partir du catalogue (lib/products.js) — on ne fait jamais confiance
// aux prix envoyés par le navigateur.
import { getAdminDb } from '../../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { getProductBySlug } from '../../../lib/products';
import { sendBrevoEmail, emailOrderConfirmationAdmin, emailBankTransferInstructions } from '../../../lib/brevo';

function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PS-${ts}-${rand}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { customer, items, paymentMethod, locale, uid } = req.body || {};

  if (!customer?.email || !customer?.firstName || !customer?.address) {
    return res.status(400).json({ error: 'Dati cliente incompleti' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Carrello vuoto' });
  }
  if (!['card', 'crypto', 'bank'].includes(paymentMethod)) {
    return res.status(400).json({ error: 'Metodo di pagamento non valido' });
  }

  // Recalcul sécurisé des lignes et du total à partir du catalogue
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
      qty
    });
  }
  const total = resolvedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (total <= 0) return res.status(400).json({ error: 'Totale non valido' });

  try {
    const db = getAdminDb();
    const orderId = generateOrderId();

    const orderData = {
      orderId,
      customer,
      uid: uid || null,
      items: resolvedItems,
      amount: total,
      currency: 'EUR',
      paymentMethod,
      paymentStatus: paymentMethod === 'bank' ? 'awaiting_transfer' : 'pending',
      status: paymentMethod === 'bank' ? 'pending_bank_transfer' : 'pending_payment',
      locale: locale || 'it',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    await db.collection('orders').doc(orderId).set(orderData);

    // Notification admin systématique à la création
    if (process.env.ADMIN_EMAIL) {
      await sendBrevoEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `🧾 Nuovo ordine creato — ${orderId}`,
        html: emailOrderConfirmationAdmin({ orderId, customer, items: resolvedItems, total, paymentMethod })
      });
    }

    // Virement bancaire : on envoie tout de suite les coordonnées au client
    if (paymentMethod === 'bank') {
      if (customer?.email) {
        await sendBrevoEmail({
          to: customer.email,
          subject: `Istruzioni di pagamento — Ordine ${orderId}`,
          html: emailBankTransferInstructions({ orderId, total })
        });
      }
    }

    return res.status(200).json({ orderId, total });
  } catch (err) {
    console.error('Order create error:', err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
}
