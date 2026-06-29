// pages/ordine-confermato.js
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useLocale } from '../lib/locale-context';

export default function OrdineConfermato() {
  const { t } = useLocale();
  const router = useRouter();
  const { ref, method } = router.query;

  return (
    <Layout title={t('order_success_title')}>
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-stock/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="font-display font-bold text-3xl text-ink mb-3">{t('order_success_title')}</h1>
        <p className="text-slate mb-2">{t('order_success_text')}</p>
        {ref && (
          <p className="font-mono text-sm text-signal font-bold mb-10">
            {t('order_ref')}: {ref}
          </p>
        )}

        {method === 'bank' && (
          <div className="bg-white border border-ink/10 rounded-sm p-6 text-left mt-6">
            <h2 className="font-display font-semibold text-lg text-ink mb-2">{t('bank_transfer_title')}</h2>
            <p className="text-sm text-slate mb-5">{t('bank_transfer_text')}</p>
            <dl className="font-mono text-sm space-y-2">
              <Row label={t('bank_beneficiary')} value="Bridge Building Sp. Z.o.o." />
              <Row label={t('bank_name')} value="Banking Circle S.A." />
              <Row label={t('bank_iban')} value="LU034080000029652683" />
              <Row label={t('bank_bic')} value="BCIRLULL" />
            </dl>
            {ref && (
              <p className="text-xs text-slate mt-5">
                ⚠️ {t('order_ref')}: <strong className="text-ink">{ref}</strong>
              </p>
            )}
          </div>
        )}

        <Link href="/negozio" className="inline-block mt-10 text-signal hover:underline font-medium">
          ← {t('cart_continue')}
        </Link>
      </section>
    </Layout>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-dashed border-ink/10 pb-2">
      <dt className="text-slate">{label}</dt>
      <dd className="font-bold text-ink">{value}</dd>
    </div>
  );
}
