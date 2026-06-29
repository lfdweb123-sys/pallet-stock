// pages/index.js
import Link from 'next/link';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import SmartsuppChat from '../components/SmartsuppChat';
import { useLocale } from '../lib/locale-context';
import { CATEGORIES, PRODUCTS } from '../lib/products';

export default function Home() {
  const { t, locale } = useLocale();
  const featured = PRODUCTS.filter((p) => p.stock <= 9).slice(0, 8);

  return (
    <Layout>
      {/* Chat en direct — affiché sur la page d'accueil */}
      <SmartsuppChat />

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-stripes opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-signal border border-signal/40 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            MAGAZZINO CAGLIARI · SARDEGNA
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-white max-w-3xl leading-[1.05] mb-6">
            {t('hero_title')}
          </h1>
          <p className="text-paper/70 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <Link
            href="/negozio"
            className="inline-flex items-center gap-2 bg-signal hover:bg-signalDark text-white font-medium px-6 py-3.5 rounded-sm transition-colors"
          >
            {t('hero_cta')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-2xl">
            {[t('hero_kpi_1'), t('hero_kpi_2'), t('hero_kpi_3')].map((kpi, i) => (
              <div key={i} className="border-t border-white/15 pt-3">
                <span className="font-mono text-[11px] text-signal">0{i + 1}</span>
                <p className="text-sm text-paper/80 mt-1">{kpi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display font-semibold text-2xl text-ink">{t('section_categories')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/negozio?categoria=${cat.slug}`}
              className="group bg-white border border-ink/10 rounded-sm p-5 flex flex-col items-center gap-2 hover:border-signal hover:shadow-md transition-all"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-mono text-xs text-center text-ink group-hover:text-signal">
                {cat.label[locale] || cat.label.it}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display font-semibold text-2xl text-ink">{t('section_featured')}</h2>
          <Link href="/negozio" className="text-sm text-signal hover:underline font-medium">
            {t('section_all_products')} →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* ── TRUST BAND ───────────────────────── */}
      <section className="bg-steel text-paper/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span>{t('free_shipping_note')}</span>
          <span className="font-mono text-xs text-paper/50">Via del Mare 12 · 09126 Cagliari · Italia</span>
        </div>
      </section>
    </Layout>
  );
}
