// pages/account/ordini.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import Layout from '../../components/Layout';
import { useLocale } from '../../lib/locale-context';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/firebase';

const STATUS_LABELS = {
  pending_payment: { label: 'In attesa di pagamento', color: 'text-slate' },
  pending_bank_transfer: { label: 'In attesa di bonifico', color: 'text-signal' },
  processing: { label: 'In preparazione', color: 'text-stock' },
  payment_failed: { label: 'Pagamento non riuscito', color: 'text-signal' }
};

export default function Ordini() {
  const { t } = useLocale();
  const { user, authLoading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

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
          where('uid', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map((d) => d.data()));
      } catch (e) {
        console.error('Errore caricamento ordini:', e);
      } finally {
        setLoadingOrders(false);
      }
    })();
  }, [user, authLoading]);

  if (!authLoading && !user) {
    return (
      <Layout title={t('nav_orders')}>
        <section className="max-w-md mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-slate mb-6">Accedi al tuo account per vedere i tuoi ordini.</p>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-2xl text-ink">{t('nav_orders')}</h1>
          <button onClick={logout} className="text-sm text-slate hover:text-signal">{t('nav_logout')}</button>
        </div>

        {loadingOrders && <p className="text-slate text-sm">…</p>}

        {!loadingOrders && orders.length === 0 && (
          <p className="text-slate text-sm">Nessun ordine trovato per questo account.</p>
        )}

        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const statusInfo = STATUS_LABELS[order.status] || { label: order.status, color: 'text-slate' };
            return (
              <div key={order.orderId} className="bg-white border border-ink/10 rounded-sm p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-sm font-bold text-ink">{order.orderId}</span>
                  <span className={`text-xs font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
                </div>
                <div className="text-xs text-slate mb-3">
                  {(order.items || []).map((i) => `${i.name} ×${i.qty}`).join(', ')}
                </div>
                <div className="font-mono font-bold text-ink">€{Number(order.amount).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
