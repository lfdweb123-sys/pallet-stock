// pages/contatti.js
import Layout from '../components/Layout';
import { useLocale } from '../lib/locale-context';

export default function Contatti() {
  const { t } = useLocale();

  return (
    <Layout title={t('contact_title')}>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display font-bold text-3xl text-ink mb-4">{t('contact_title')}</h1>
        <p className="text-slate mb-10 leading-relaxed">{t('contact_text')}</p>

        <div className="bg-white border border-ink/10 rounded-sm p-6 mb-6">
          <div className="font-mono text-xs text-signal uppercase mb-2">{t('contact_address_label')}</div>
          <p className="text-ink">
            Pallet Stock<br />
            Via del Mare 12<br />
            09126 Cagliari (CA)<br />
            Sardegna, Italia
          </p>
        </div>

        <div className="bg-white border border-ink/10 rounded-sm p-6">
          <div className="font-mono text-xs text-signal uppercase mb-2">Email</div>
          <p className="text-ink">{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@palletstock.com'}</p>
        </div>
      </section>
    </Layout>
  );
}
