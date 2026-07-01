// pages/checkout.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useLocale } from '../lib/locale-context';
import { useCart } from '../lib/cart-context';
import { useAuth } from '../lib/auth-context';

const COUNTRIES = ['Italia', 'Francia', 'Belgio', 'Spagna', 'Germania', 'Svizzera', 'Lussemburgo', 'Altro / Autre'];
const LS_PROMO_KEY = 'ps_ref';

export default function Checkout() {
  const { t } = useLocale();
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: user?.email || '', phone: '',
    address: '', city: '', zip: '', country: 'Italia', notes: '',
  });
  const [method, setMethod] = useState('card');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ── Code promo / parrainage ──────────────────────────────────────────
  const [promoInput, setPromoInput]     = useState('');
  const [promoCode, setPromoCode]       = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError]     = useState('');
  const [applyingPromo, setApplyingPromo] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(LS_PROMO_KEY) : '';
    if (saved) setPromoInput(saved);
  }, []);

  const isPromoEligible = ['card', 'crypto'].includes(method);
  const discount   = promoApplied && isPromoEligible ? Math.round(subtotal * 0.10 * 100) / 100 : 0;
  const finalTotal = subtotal - discount;

  useEffect(() => {
    if (!isPromoEligible && promoApplied) {
      setPromoApplied(false);
      setPromoCode('');
    }
  }, [method]);

  async function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    setApplyingPromo(true);
    setPromoError('');
    try {
      const res = await fetch(`/api/referral/validate?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.valid) {
        setPromoCode(code);
        setPromoApplied(true);
        setPromoError('');
        localStorage.setItem(LS_PROMO_KEY, code);
      } else {
        setPromoError(t('promo_code_invalid'));
        setPromoApplied(false);
        setPromoCode('');
      }
    } catch {
      setPromoError(t('error_generic'));
    } finally {
      setApplyingPromo(false);
    }
  }

  function removePromo() {
    setPromoApplied(false);
    setPromoCode('');
    setPromoInput('');
    setPromoError('');
    localStorage.removeItem(LS_PROMO_KEY);
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'zip', 'country'];
    for (const f of required) {
      if (!form[f] || !form[f].trim()) return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return false;
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (items.length === 0) { setError(t('error_generic')); return; }
    if (!validate()) { setError(t('required_field')); return; }

    setSubmitting(true);
    try {
      const createRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
          paymentMethod: method,
          locale: 'it',
          uid: user?.uid || null,
          referralCode: promoApplied && isPromoEligible ? promoCode : null,
        }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error || 'Order error');
      const { orderId } = createData;

      localStorage.removeItem(LS_PROMO_KEY);

      if (method === 'card') {
        const payRes = await fetch('/api/card-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });
        const payData = await payRes.json();
        if (!payRes.ok || !payData.success) throw new Error(payData.message || 'Payment error');
        clearCart();
        if (payData.redirect && payData.redirectUrl) {
          window.location.href = payData.redirectUrl;
        } else {
          router.push(`/ordine-confermato?ref=${orderId}&method=card`);
        }
        return;
      }

      if (method === 'crypto') {
        const payRes = await fetch('/api/nowpayments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });
        const payData = await payRes.json();
        if (!payRes.ok || !payData.invoice_url) throw new Error(payData.message || 'Payment error');
        clearCart();
        window.location.href = payData.invoice_url;
        return;
      }

      clearCart();
      router.push(`/ordine-confermato?ref=${orderId}&method=bank`);
    } catch (err) {
      console.error(err);
      setError(t('error_generic'));
      setSubmitting(false);
    }
  }

  return (
    <Layout title={t('checkout_title')}>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-8">{t('checkout_title')}</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* ── Colonne gauche ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Contact */}
            <fieldset>
              <legend className="font-display font-semibold text-lg text-ink mb-4">{t('checkout_contact')}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label={t('checkout_firstname')} value={form.firstName} onChange={(v) => update('firstName', v)} required />
                <Input label={t('checkout_lastname')}  value={form.lastName}  onChange={(v) => update('lastName', v)}  required />
                <Input label={t('checkout_email')} type="email" value={form.email} onChange={(v) => update('email', v)} required />
                <Input label={t('checkout_phone')} type="tel"  value={form.phone} onChange={(v) => update('phone', v)} />
              </div>
            </fieldset>

            {/* Livraison */}
            <fieldset>
              <legend className="font-display font-semibold text-lg text-ink mb-4">{t('checkout_shipping')}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input className="sm:col-span-2" label={t('checkout_address')} value={form.address} onChange={(v) => update('address', v)} required />
                <Input label={t('checkout_city')} value={form.city} onChange={(v) => update('city', v)} required />
                <Input label={t('checkout_zip')}  value={form.zip}  onChange={(v) => update('zip', v)}  required />
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate mb-1">{t('checkout_country')}</label>
                  <select
                    value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                    className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm bg-white focus:border-signal outline-none"
                  >
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate mb-1">{t('checkout_notes')}</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    rows={3}
                    className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm bg-white focus:border-signal outline-none"
                  />
                </div>
              </div>
            </fieldset>

            {/* Paiement */}
            <fieldset>
              <legend className="font-display font-semibold text-lg text-ink mb-4">{t('checkout_payment')}</legend>
              <div className="flex flex-col gap-3">
                <PaymentOption id="card"   selected={method === 'card'}   onSelect={setMethod} title={t('pay_card')}   desc={t('pay_card_desc')}   icon="💳" />
                <PaymentOption id="crypto" selected={method === 'crypto'} onSelect={setMethod} title={t('pay_crypto')} desc={t('pay_crypto_desc')} icon="₿"  />
                <PaymentOption id="bank"   selected={method === 'bank'}   onSelect={setMethod} title={t('pay_bank')}   desc={t('pay_bank_desc')}   icon="🏦" />
              </div>
            </fieldset>
          </div>

          {/* ── Récapitulatif sticky ── */}
          <div className="lg:sticky lg:top-6 bg-white border border-ink/10 rounded-sm p-6 flex flex-col gap-4">

            {/* Articles */}
            <div className="font-mono text-xs text-slate">{items.length} {t('items_count')}</div>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {items.map((i) => (
                <div key={i.slug} className="flex justify-between text-sm gap-2">
                  <span className="text-ink/80 truncate">{i.name} × {i.qty}</span>
                  <span className="font-mono flex-shrink-0">€{(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Sous-total + livraison */}
            <div className="flex justify-between text-sm">
              <span className="text-slate">{t('cart_subtotal')}</span>
              <span className="font-mono">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate">{t('cart_shipping')}</span>
              <span className="text-stock font-medium">{t('cart_shipping_free')}</span>
            </div>

            {/* ── Code promo ── */}
            <div className="border-t border-dashed border-ink/10 pt-4 flex flex-col gap-2">
              <label className="block text-xs font-medium text-slate">
                {t('promo_code_label')}
                {method === 'bank' && (
                  <span className="ml-1 text-slate/60 font-normal">{t('promo_code_bank_excluded')}</span>
                )}
              </label>

              {promoApplied && isPromoEligible ? (
                <div className="flex items-center justify-between bg-stock/10 border border-stock/30 rounded-sm px-3 py-2">
                  <span className="text-sm text-stock font-mono font-semibold">{promoCode}</span>
                  <button type="button" onClick={removePromo} className="text-xs text-slate hover:text-signal ml-2 flex-shrink-0">
                    {t('promo_code_remove')}
                  </button>
                </div>
              ) : (
                /* INPUT + BOUTON sur deux lignes pour éviter le débordement */
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder={t('promo_code_placeholder')}
                    disabled={method === 'bank'}
                    className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:border-signal outline-none font-mono disabled:bg-paperDark disabled:text-slate disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    disabled={!promoInput.trim() || applyingPromo || method === 'bank'}
                    className="w-full bg-ink text-white text-sm font-medium py-2 rounded-sm hover:bg-signal transition-colors disabled:opacity-40"
                  >
                    {applyingPromo ? '…' : t('promo_code_apply')}
                  </button>
                </div>
              )}

              {promoError && <p className="text-signal text-xs">{promoError}</p>}
              {promoApplied && isPromoEligible && (
                <p className="text-stock text-xs font-mono">{t('promo_code_applied')}</p>
              )}
            </div>

            {/* Réduction */}
            {discount > 0 && (
              <div className="flex justify-between text-sm text-stock">
                <span>{t('cart_discount')} (−10%)</span>
                <span className="font-mono">−€{discount.toFixed(2)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between font-bold text-lg border-t border-dashed border-ink/15 pt-3">
              <span>{t('cart_total')}</span>
              <span className="font-mono">€{finalTotal.toFixed(2)}</span>
            </div>

            {error && <p className="text-signal text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting || items.length === 0}
              className="w-full bg-signal text-white font-medium py-3.5 rounded-sm hover:bg-signalDark transition-colors disabled:opacity-50"
            >
              {submitting ? t('placing_order') : t('place_order')}
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

function Input({ label, value, onChange, type = 'text', required = false, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-slate mb-1">
        {label}{required && <span className="text-signal"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm bg-white focus:border-signal outline-none"
      />
    </div>
  );
}

function PaymentOption({ id, selected, onSelect, title, desc, icon }) {
  return (
    <label
      className={`flex items-start gap-3 border rounded-sm p-4 cursor-pointer transition-colors ${
        selected ? 'border-signal bg-signal/5' : 'border-ink/15 bg-white hover:border-ink/30'
      }`}
    >
      <input type="radio" name="payment" checked={selected} onChange={() => onSelect(id)} className="mt-1 accent-[#FF5A1F]" />
      <span className="text-xl">{icon}</span>
      <span>
        <span className="block font-medium text-sm text-ink">{title}</span>
        <span className="block text-xs text-slate mt-0.5">{desc}</span>
      </span>
    </label>
  );
}
