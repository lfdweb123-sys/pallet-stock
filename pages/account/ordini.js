// pages/account/ordini.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
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

const PAYMENT_LABEL_KEYS = {
  card: 'pay_card',
  crypto: 'pay_crypto',
  bank: 'pay_bank',
};

function formatDate(timestamp, locale) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const localeMap = { it: 'it-IT', fr: 'fr-FR', en: 'en-GB' };
  return date.toLocaleDateString(localeMap[locale] || 'it-IT', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function OrderCard({ order, t, locale }) {
  const [expanded, setExpanded] = useState(false);
  const statusInfo = STATUS_STYLES[order.status] || { color: 'text-slate', bg: 'bg-slate/10' };
  const statusLabel = t(`status_${order.status}`) !== `status_${order.status}`
    ? t(`status_${order.status}`)
    : order.status;

  // Enrichit chaque item avec l'image produit depuis lib/products.js via le slug
  const items = (order.items || []).map((item) => {
    const product = item.slug ? getProductBySlug(item.slug) : null;
    return { ...item, image: product?.image || null };
  });
  const itemsCount = items.reduce((sum, i) => sum + (i.qty || 1), 0);
  const paymentKey = PAYMENT_LABEL_KEYS[order.paymentMethod];
  const customer = order.customer || {};

  return (
    <div className="bg-white border border-ink/10 rounded-sm overflow-hidden">
      {/* Header résumé */}
      <div className="p-5 border-b border-dashed border-ink/10">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="font-mono text-xs text-slate mb-0.5">
              {t('orders_order_number')}
            </div>
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

      {/* Aperçu articles (toujours visible) */}
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
          <button
            onClick={() => setExpanded(true)}
            className="text-xs text-signal hover:underline font-mono text-left"
          >
            +{items.length - 2} {t('orders_items_count')}
          </button>
        )}

        {/* Détails étendus */}
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
              {customer.phone && (
                <p className="text-xs text-slate mt-1.5">{customer.phone}</p>
              )}
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate mb-1.5">
                {t('orders_payment_method')}
              </p>
              <p className="text-sm text-ink/80">
                {paymentKey ? t(paymentKey) : order.paymentMethod || '—'}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-dashed border-ink/10 mt-1">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs text-signal hover:underline font-mono"
          >
            {expanded ? t('orders_hide_details') : t('orders_view_details')}
          </button>
          <div className="text-right">
            <div className="font-mono text-[10px] text-slate">{t('orders_total')}</div>
            <div className="font-mono font-bold text-ink text-lg">€{Number(order.amount).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ordini() {
  const { t, locale } = useLocale();
  const { user, authLoading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoadingOrders(false);
      return;
    }
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
  }, [user, authLoading]);

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

  return (
    <Layout title={t('nav_orders')}>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="font-display font-bold text-2xl text-ink mb-1">{t('orders_title')}</h1>
            <p className="text-slate text-sm">{t('orders_subtitle')}</p>
          </div>
          <button onClick={logout} className="text-sm text-slate hover:text-signal whitespace-nowrap">
            {t('nav_logout')}
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {(authLoading || loadingOrders) && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-6 h-6 border-2 border-ink/20 border-t-signal rounded-full animate-spin mb-3" />
              <p className="text-slate text-sm font-mono">{t('orders_loading')}</p>
            </div>
          )}

          {!loadingOrders && !authLoading && error && (
            <div className="text-center py-12">
              <p className="text-signal text-sm">{t('error_generic')}</p>
            </div>
          )}

          {!loadingOrders && !authLoading && !error && orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4">📦</span>
              <p className="text-ink font-display font-semibold mb-1">{t('orders_empty_title')}</p>
              <p className="text-slate text-sm font-mono mb-6">{t('orders_empty_text')}</p>
              <Link
                href="/negozio"
                className="inline-block bg-ink text-white px-6 py-3 rounded-sm hover:bg-signal transition-colors text-sm"
              >
                {t('hero_cta')}
              </Link>
            </div>
          )}

          {!loadingOrders && !authLoading && orders.map((order) => (
            <OrderCard key={order.orderId} order={order} t={t} locale={locale} />
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
      </section>
    </Layout>
  );
}