// lib/brevo.js
const BRAND = 'Pallet Stock';
const COLORS = { ink: '#1B1D1F', signal: '#FF5A1F', paper: '#F5F1EA' };

export async function sendBrevoEmail({ to, subject, html }) {
  if (!process.env.BREVO_API_KEY || !to) {
    console.warn('Brevo non configuré ou destinataire manquant — email ignoré');
    return;
  }
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: BRAND, email: process.env.SHOP_EMAIL || 'noreply@palletstock.com' },
        to: [{ email: to }],
        subject,
        htmlContent: html
      })
    });
    if (!res.ok) {
      console.error('Brevo error:', await res.text());
    }
  } catch (e) {
    console.error('Brevo fetch error:', e.message);
  }
}

function layout(innerHtml) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
  <body style="font-family:Arial,Helvetica,sans-serif;background:${COLORS.paper};margin:0;padding:0;">
    <div style="max-width:580px;margin:32px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
      <div style="background:${COLORS.ink};padding:28px 32px;">
        <div style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:.5px;">PALLET <span style="color:${COLORS.signal};">STOCK</span></div>
        <div style="color:rgba(255,255,255,.6);font-size:12px;margin-top:4px;">Cagliari, Sardegna · Italia</div>
      </div>
      <div style="padding:32px;">${innerHtml}</div>
      <div style="padding:18px 32px;border-top:1px solid #eee;font-size:11px;color:#9a9a9a;">
        Pallet Stock — Via del Mare 12, 09126 Cagliari (CA), Italia
      </div>
    </div>
  </body></html>`;
}

export function emailOrderConfirmationCustomer({ orderId, items, total, currency = 'EUR', paymentMethod }) {
  const rows = (items || [])
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;color:#333;font-size:13px;">${i.name} × ${i.qty}</td>
         <td style="padding:6px 0;text-align:right;font-size:13px;font-weight:700;">€${(i.price * i.qty).toFixed(2)}</td></tr>`
    )
    .join('');
  const methodLabel = { card: 'Carta', crypto: 'Criptovaluta', bank: 'Bonifico bancario' }[paymentMethod] || paymentMethod;
  return layout(`
    <h2 style="margin:0 0 6px;color:${COLORS.ink};">Grazie per il tuo ordine!</h2>
    <p style="color:#777;font-size:14px;margin:0 0 20px;">Riferimento: <strong style="color:${COLORS.signal};font-family:monospace;">${orderId}</strong></p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">${rows}</table>
    <div style="display:flex;justify-content:space-between;border-top:2px solid ${COLORS.ink};padding-top:10px;font-weight:800;font-size:15px;">
      <span>Totale</span><span>€${parseFloat(total).toFixed(2)}</span>
    </div>
    <p style="font-size:13px;color:#777;margin-top:20px;">Metodo di pagamento: <strong>${methodLabel}</strong></p>
    <p style="font-size:13px;color:#777;">Ti contatteremo per la spedizione. Per qualsiasi domanda, rispondi a questa email o usa la chat sul sito.</p>
  `);
}

export function emailOrderConfirmationAdmin({ orderId, customer, items, total, paymentMethod }) {
  const rows = (items || [])
    .map((i) => `<li>${i.name} × ${i.qty} — €${(i.price * i.qty).toFixed(2)}</li>`)
    .join('');
  return layout(`
    <h2 style="margin:0 0 14px;color:${COLORS.signal};">Nuovo ordine ricevuto</h2>
    <p style="font-size:13px;color:#333;"><strong>Riferimento:</strong> ${orderId}</p>
    <p style="font-size:13px;color:#333;"><strong>Cliente:</strong> ${customer?.firstName || ''} ${customer?.lastName || ''} — ${customer?.email || ''} — ${customer?.phone || ''}</p>
    <p style="font-size:13px;color:#333;"><strong>Indirizzo:</strong> ${customer?.address || ''}, ${customer?.zip || ''} ${customer?.city || ''}, ${customer?.country || ''}</p>
    <p style="font-size:13px;color:#333;"><strong>Pagamento:</strong> ${paymentMethod}</p>
    <ul style="font-size:13px;color:#333;">${rows}</ul>
    <p style="font-size:14px;font-weight:800;">Totale: €${parseFloat(total).toFixed(2)}</p>
  `);
}

export function emailBankTransferInstructions({ orderId, total, t }) {
  return layout(`
    <h2 style="margin:0 0 6px;color:${COLORS.ink};">${t ? t('bank_transfer_title') : 'Istruzioni per il bonifico'}</h2>
    <p style="font-size:14px;color:#555;">Riferimento ordine: <strong style="font-family:monospace;color:${COLORS.signal};">${orderId}</strong></p>
    <p style="font-size:14px;color:#555;">Importo da versare: <strong>€${parseFloat(total).toFixed(2)}</strong></p>
    <table style="width:100%;font-size:13px;border-collapse:collapse;margin-top:14px;">
      <tr><td style="color:#888;padding:4px 0;">Beneficiario</td><td style="font-weight:700;">Bridge Building Sp. Z.o.o.</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Banca</td><td style="font-weight:700;">Banking Circle S.A.</td></tr>
      <tr><td style="color:#888;padding:4px 0;">IBAN</td><td style="font-weight:700;font-family:monospace;">LU034080000029652683</td></tr>
      <tr><td style="color:#888;padding:4px 0;">BIC/SWIFT</td><td style="font-weight:700;font-family:monospace;">BCIRLULL</td></tr>
    </table>
    <p style="font-size:12px;color:#999;margin-top:16px;">Indica obbligatoriamente il riferimento ordine nella causale del bonifico.</p>
  `);
}

export function emailPaymentReceived({ orderId, total }) {
  return layout(`
    <h2 style="margin:0 0 6px;color:${COLORS.ink};">Pagamento ricevuto ✅</h2>
    <p style="font-size:14px;color:#555;">Ordine <strong style="font-family:monospace;color:${COLORS.signal};">${orderId}</strong> confermato per un totale di <strong>€${parseFloat(total).toFixed(2)}</strong>.</p>
    <p style="font-size:14px;color:#555;">Stiamo preparando la spedizione dal nostro magazzino di Cagliari.</p>
  `);
}

export function emailPaymentFailed({ orderId }) {
  return layout(`
    <h2 style="margin:0 0 6px;color:${COLORS.ink};">Pagamento non riuscito</h2>
    <p style="font-size:14px;color:#555;">Il pagamento per l'ordine <strong style="font-family:monospace;">${orderId}</strong> non è andato a buon fine. Puoi riprovare dal nostro sito o contattarci via chat.</p>
  `);
}
