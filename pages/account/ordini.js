// pages/account/ordini.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  collection, query, where, orderBy, getDocs, doc, getDoc, setDoc, serverTimestamp,
} from 'firebase/firestore';
import {
  EmailAuthProvider, reauthenticateWithCredential, updatePassword,
} from 'firebase/auth';
import Layout from '../../components/Layout';
import { useLocale } from '../../lib/locale-context';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/firebase';
import { getProductBySlug } from '../../lib/products';

const STATUS_STYLES = {
  pending_payment:        { color: 'text-slate',  bg: 'bg-slate/10' },
  pending_bank_transfer:  { color: 'text-signal', bg: 'bg-signal/10' },
  processing:             { color: 'text-stock',  bg: 'bg-stock/10' },
  shipped:                { color: 'text-ink',    bg: 'bg-ink/10' },
  delivered:              { color: 'text-stock',  bg: 'bg-stock/15' },
  cancelled:              { color: 'text-slate',  bg: 'bg-slate/10' },
  payment_failed:         { color: 'text-signal', bg: 'bg-signal/10' },
  refunded:               { color: 'text-slate',  bg: 'bg-slate/10' },
};

const PAYMENT_LABEL_KEYS = { card: 'pay_card', crypto: 'pay_crypto', bank: 'pay_bank' };

function formatDate(timestamp, locale) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const localeMap = { it: 'it-IT', fr: 'fr-FR', en: 'en-GB' };
  return date.toLocaleDateString(localeMap[locale] || 'it-IT', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

// ── Facture imprimable (overlay plein écran) ────────────────────────────
function InvoiceOverlay({ order, items, t, locale, onClose }) {
  const customer = order.customer || {};
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center overflow-y-auto py-8 px-4 print:bg-white print:p-0">
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-xl print:shadow-none print:rounded-none">
        <div className="flex items-center justify-between p-5 border-b border-ink/10 print:hidden">
          <span className="font-display font-bold text-ink">{t('invoice_title')}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="bg-ink text-white text-sm font-medium px-4 py-2 rounded-sm hover:bg-signal transition-colors"
            >
              {t('invoice_print')}
            </button>
            <button onClick={onClose} className="text-slate hover:text-ink">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="font-display font-bold text-xl text-ink">
                PALLET<span className="text-signal">STOCK</span>
              </p>
              <p className="text-xs text-slate font-mono mt-1">Via del Mare 12 · 09126 Cagliari · Italia</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-slate">{t('orders_order_number')}</p>
              <p className="font-mono font-bold text-ink">{order.orderId}</p>
              <p className="font-mono text-xs text-slate mt-1">{t('invoice_order_date')}</p>
              <p className="font-mono text-sm text-ink">{formatDate(order.createdAt, locale)}</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-wide text-slate mb-1.5">
              {t('invoice_billed_to')}
            </p>
            <p className="text-sm text-ink/80 leading-relaxed">
              {customer.firstName} {customer.lastName}<br />
              {customer.address}<br />
              {customer.zip} {customer.city}<br />
              {customer.country}<br />
              {customer.email}
            </p>
          </div>

          <table className="w-full text-sm mb-8">
            <thead>
              <tr className="border-b border-ink/15 text-left">
                <th className="py-2 font-mono text-[11px] uppercase tracking-wide text-slate">{t('invoice_item')}</th>
                <th className="py-2 font-mono text-[11px] uppercase tracking-wide text-slate text-center">{t('invoice_qty')}</th>
                <th className="py-2 font-mono text-[11px] uppercase tracking-wide text-slate text-right">{t('invoice_unit_price')}</th>
                <th className="py-2 font-mono text-[11px] uppercase tracking-wide text-slate text-right">{t('invoice_line_total')}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-b border-ink/5">
                  <td className="py-3 text-ink">{item.name}</td>
                  <td className="py-3 text-center font-mono text-ink">{item.qty}</td>
                  <td className="py-3 text-right font-mono text-ink">€{Number(item.price).toFixed(2)}</td>
                  <td className="py-3 text-right font-mono text-ink">€{(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-48 flex items-center justify-between border-t border-ink/15 pt-3">
              <span className="font-display font-bold text-ink">{t('orders_total')}</span>
              <span className="font-mono font-bold text-lg text-ink">€{Number(order.amount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Carte commande ───────────────────────────────────────────────────────
function OrderCard({ order, t, locale, onShowInvoice }) {
  const [expanded, setExpanded] = useState(false);
  const statusInfo = STATUS_STYLES[order.status] || { color: 'text-slate', bg: 'bg-slate/10' };
  const statusLabel = t(`status_${order.status}`) !== `status_${order.status}`
    ? t(`status_${order.status}`)
    : order.status;

  const items = (order.items || []).map((item) => {
    const product = item.slug ? getProductBySlug(item.slug) : null;
    return { ...item, image: product?.image || null };
  });
  const itemsCount = items.reduce((sum, i) => sum + (i.qty || 1), 0);
  const paymentKey = PAYMENT_LABEL_KEYS[order.paymentMethod];
  const customer = order.customer || {};

  return (
    <div className="bg-white border border-ink/10 rounded-sm overflow-hidden">
      <div className="p-5 border-b border-dashed border-ink/10">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="font-mono text-xs text-slate mb-0.5">{t('orders_order_number')}</div>
            <span className="font-mono text-sm font-bold text-ink">{order.orderId}</span>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo.color} ${statusInfo.bg}`}>
            {statusLabel}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-slate font-mono">
          <span>{t('orders_date')}: {formatDate(order.createdAt, locale)}</span>
          <span>{itemsCount} {t('orders_items_count')}</span>
          {paymentKey && <span>{t(paymentKey)}</span>}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        {items.slice(0, expanded ? items.length : 2).map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {item.image ? (
              <div className="relative w-12 h-12 flex-shrink-0 bg-paperDark rounded-sm overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 flex-shrink-0 bg-paperDark rounded-sm" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink font-medium truncate">{item.name}</p>
              <p className="text-xs text-slate font-mono">
                {t('orders_qty_short')}: {item.qty} {item.price != null && `· €${Number(item.price).toFixed(2)}`}
              </p>
            </div>
          </div>
        ))}
        {!expanded && items.length > 2 && (
          <button onClick={() => setExpanded(true)} className="text-xs text-signal hover:underline font-mono text-left">
            +{items.length - 2} {t('orders_items_count')}
          </button>
        )}

        {expanded && (
          <div className="mt-2 pt-4 border-t border-dashed border-ink/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate mb-1.5">
                {t('orders_shipping_address')}
              </p>
              <p className="text-sm text-ink/80 leading-relaxed">
                {customer.firstName} {customer.lastName}<br />
                {customer.address}<br />
                {customer.zip} {customer.city}<br />
                {customer.country}
              </p>
              {customer.phone && <p className="text-xs text-slate mt-1.5">{customer.phone}</p>}
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate mb-1.5">
                {t('orders_payment_method')}
              </p>
              <p className="text-sm text-ink/80">{paymentKey ? t(paymentKey) : order.paymentMethod || '—'}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-dashed border-ink/10 mt-1">
          <div className="flex items-center gap-4">
            <button onClick={() => setExpanded((v) => !v)} className="text-xs text-signal hover:underline font-mono">
              {expanded ? t('orders_hide_details') : t('orders_view_details')}
            </button>
            <button
              onClick={() => onShowInvoice({ order, items })}
              className="text-xs text-ink hover:text-signal underline font-mono"
            >
              {t('invoice_print')}
            </button>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] text-slate">{t('orders_total')}</div>
            <div className="font-mono font-bold text-ink text-lg">€{Number(order.amount).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Onglet : Mes commandes ───────────────────────────────────────────────
function OrdersTab({ t, locale, user }) {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, 'orders'),
          where('customer.email', '==', user.email),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map((d) => d.data()));
      } catch (e) {
        console.error('Errore caricamento ordini:', e);
        setError(true);
      } finally {
        setLoadingOrders(false);
      }
    })();
  }, [user]);

  return (
    <>
      <h2 className="font-display font-bold text-xl text-ink mb-1">{t('orders_title')}</h2>
      <p className="text-slate text-sm mb-6">{t('orders_subtitle')}</p>

      <div className="flex flex-col gap-4">
        {loadingOrders && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-6 h-6 border-2 border-ink/20 border-t-signal rounded-full animate-spin mb-3" />
            <p className="text-slate text-sm font-mono">{t('orders_loading')}</p>
          </div>
        )}

        {!loadingOrders && error && (
          <div className="text-center py-12"><p className="text-signal text-sm">{t('error_generic')}</p></div>
        )}

        {!loadingOrders && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4">📦</span>
            <p className="text-ink font-display font-semibold mb-1">{t('orders_empty_title')}</p>
            <p className="text-slate text-sm font-mono mb-6">{t('orders_empty_text')}</p>
            <Link href="/negozio" className="inline-block bg-ink text-white px-6 py-3 rounded-sm hover:bg-signal transition-colors text-sm">
              {t('hero_cta')}
            </Link>
          </div>
        )}

        {!loadingOrders && orders.map((order) => (
          <OrderCard key={order.orderId} order={order} t={t} locale={locale} onShowInvoice={setInvoiceData} />
        ))}
      </div>

      {orders.length > 0 && (
        <div className="mt-10 text-center border-t border-dashed border-ink/10 pt-6">
          <p className="text-sm text-slate mb-2">{t('orders_need_help')}</p>
          <Link href="/contatti" className="text-sm text-signal hover:underline font-medium">
            {t('orders_contact_support')}
          </Link>
        </div>
      )}

      {invoiceData && (
        <InvoiceOverlay
          order={invoiceData.order}
          items={invoiceData.items}
          t={t}
          locale={locale}
          onClose={() => setInvoiceData(null)}
        />
      )}
    </>
  );
}

// ── Onglet : Mon profil ──────────────────────────────────────────────────
function ProfileTab({ t, user }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', zip: '', country: '' });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    (async () => {
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const d = snap.data();
          setForm({
            name: d.name || user.displayName || '',
            phone: d.phone || '',
            address: d.address || '',
            city: d.city || '',
            zip: d.zip || '',
            country: d.country || '',
          });
        } else {
          setForm((f) => ({ ...f, name: user.displayName || '' }));
        }
      } catch (e) {
        console.error('Errore caricamento profilo:', e);
      } finally {
        setLoadingProfile(false);
      }
    })();
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const ref = doc(db, 'users', user.uid);
      await setDoc(ref, { ...form, email: user.email, updatedAt: serverTimestamp() }, { merge: true });
      setStatus('success');
    } catch (e) {
      console.error('Errore salvataggio profilo:', e);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  }

  if (loadingProfile) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-6 h-6 border-2 border-ink/20 border-t-signal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <h2 className="font-display font-bold text-xl text-ink mb-1">{t('profile_title')}</h2>
      <p className="text-slate text-sm mb-6">{t('profile_subtitle')}</p>

      <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-sm p-6 flex flex-col gap-4 max-w-lg">
        <div>
          <label className="block text-xs font-medium text-slate mb-1">{t('checkout_email')}</label>
          <input
            type="email" value={user.email} disabled
            className="w-full border border-ink/10 bg-paperDark/50 rounded-sm px-3 py-2.5 text-sm text-slate cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate mb-1">{t('profile_name')}</label>
          <input
            type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate mb-1">{t('profile_phone')}</label>
          <input
            type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate mb-1">{t('profile_address')}</label>
          <input
            type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate mb-1">{t('profile_city')}</label>
            <input
              type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate mb-1">{t('profile_zip')}</label>
            <input
              type="text" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })}
              className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate mb-1">{t('profile_country')}</label>
          <input
            type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
          />
        </div>

        {status === 'success' && <p className="text-stock text-sm">{t('profile_saved')}</p>}
        {status === 'error' && <p className="text-signal text-sm">{t('profile_save_error')}</p>}

        <button
          type="submit" disabled={saving}
          className="bg-ink text-white font-medium py-3 rounded-sm hover:bg-signal transition-colors disabled:opacity-50 mt-2"
        >
          {saving ? '…' : t('profile_save')}
        </button>
      </form>
    </>
  );
}

// ── Onglet : Sécurité ─────────────────────────────────────────────────────
function SecurityTab({ t, user }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword.length < 6) {
      setError(t('security_error_weak'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t('security_error_mismatch'));
      return;
    }

    setSaving(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError(t('security_error_wrong_current'));
      } else {
        setError(t('security_error_generic'));
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h2 className="font-display font-bold text-xl text-ink mb-1">{t('security_title')}</h2>
      <p className="text-slate text-sm mb-6">{t('security_subtitle')}</p>

      <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-sm p-6 flex flex-col gap-4 max-w-lg">
        <div>
          <label className="block text-xs font-medium text-slate mb-1">{t('security_current_password')}</label>
          <input
            type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate mb-1">{t('security_new_password')}</label>
          <input
            type="password" required minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate mb-1">{t('security_confirm_password')}</label>
          <input
            type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
          />
        </div>

        {error && <p className="text-signal text-sm">{error}</p>}
        {success && <p className="text-stock text-sm">{t('security_updated')}</p>}

        <button
          type="submit" disabled={saving}
          className="bg-ink text-white font-medium py-3 rounded-sm hover:bg-signal transition-colors disabled:opacity-50 mt-2"
        >
          {saving ? '…' : t('security_update')}
        </button>
      </form>
    </>
  );
}

// ── Page principale avec sidebar ─────────────────────────────────────────
export default function Ordini() {
  const { t, locale } = useLocale();
  const { user, authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  if (!authLoading && !user) {
    return (
      <Layout title={t('nav_orders')}>
        <section className="max-w-md mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-slate mb-6">{t('orders_login_prompt')}</p>
          <Link href="/account/accedi" className="inline-block bg-ink text-white px-6 py-3 rounded-sm hover:bg-signal transition-colors">
            {t('nav_login')}
          </Link>
        </section>
      </Layout>
    );
  }

  if (authLoading || !user) {
    return (
      <Layout title={t('nav_orders')}>
        <div className="flex items-center justify-center py-32">
          <div className="w-6 h-6 border-2 border-ink/20 border-t-signal rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const TABS = [
    { key: 'orders', label: t('account_tab_orders'), icon: '📦' },
    { key: 'profile', label: t('account_tab_profile'), icon: '👤' },
    { key: 'security', label: t('account_tab_security'), icon: '🔒' },
  ];

  return (
    <Layout title={t('nav_orders')}>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar gauche */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              <div className="mb-4 px-1">
                <p className="font-display font-semibold text-sm text-ink truncate">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-slate truncate">{user.email}</p>
              </div>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-3 py-2.5 text-sm font-mono rounded-sm transition-colors whitespace-nowrap text-left ${
                      activeTab === tab.key ? 'bg-ink text-white' : 'text-ink hover:bg-ink/5'
                    }`}
                  >
                    <span className="text-base leading-none">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-mono rounded-sm text-slate hover:text-signal hover:bg-signal/5 transition-colors whitespace-nowrap text-left mt-1 lg:mt-3 lg:border-t lg:border-ink/10 lg:pt-3"
                >
                  <span className="text-base leading-none">↪</span>
                  {t('nav_logout')}
                </button>
              </nav>
            </div>
          </aside>

          {/* Contenu */}
          <div className="flex-1 min-w-0">
            {activeTab === 'orders' && <OrdersTab t={t} locale={locale} user={user} />}
            {activeTab === 'profile' && <ProfileTab t={t} user={user} />}
            {activeTab === 'security' && <SecurityTab t={t} user={user} />}
          </div>
        </div>
      </section>
    </Layout>
  );
}