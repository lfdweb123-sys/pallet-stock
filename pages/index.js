// pages/index.js
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import SmartsuppChat from '../components/SmartsuppChat';
import { useLocale } from '../lib/locale-context';
import { CATEGORIES, PRODUCTS } from '../lib/products';

// Image représentative par catégorie (un produit phare de chaque)
const CATEGORY_IMAGES = {
  console:        'https://media.direct.playstation.com/is/image/psdglobal/2025-PS5-Disc-Hero-1-Console?$Background_Large$',
  smartphone:     '/images/products/iphone16promax.webp',
  audio:          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361',
  tablet:         '/images/products/ipad-air-model-unselect-gallery-1-202405.webp',
  computer:       '/images/products/macbook-air-size-unselect-202601-gallery-1.webp',
  drone:          '/images/products/6f8ef1cb760b78a3a2226ff57b608c2d@origin.jpg',
  ebike:          '/images/products/pms_1661321967.02267825.webp',
  frigo:          '/images/products/RB50DG602ES9EF_PC.webp',
  climatizzatore: '/images/products/88503.webp',
  riscaldamento:  '/images/products/71qzhuJD6lL._AC_SY741_.jpg',
  pellet:         '/images/products/91ms1iqH+FL._AC_SY300_SX300_QL70_ML2_.jpg',
  aspirapolvere:  '/images/products/446986-01.webp',
  cucina:         '/images/products/81YR2ubSOxL._AC_SX679_.jpg',
  forno:          '/images/products/710ccHatHcL._AC_SX342_SY445_QL70_ML2_.jpg',
  'casa-giardino':'/images/products/61LflSvDBFL._AC_UL320_.jpg',
  occhiali:       '/images/products/61q2zDktqCL._AC_UL320_.jpg',
  animali:        '/images/products/71FgnxRXgHL._AC_UL320_.jpg',
  'fai-da-te':    'https://assets.jobalots.com/product_image/4LBTKhjRdqmZPI6BHxGPJnjod9RVH4gwlWGZ60lD.png?format=auto&width=1080&quality=100',
};

const TRUST_BADGES = [
  {
    key: 'trust_payment',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'trust_return',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    key: 'trust_support',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    key: 'trust_verified',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function Home() {
  const { t, locale } = useLocale();
  const featured = PRODUCTS.filter((p) => p.stock <= 9).slice(0, 8);

  return (
    <Layout>
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

      {/* ── CATEGORIES avec images ────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display font-semibold text-2xl text-ink">{t('section_categories')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const imgSrc = CATEGORY_IMAGES[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/negozio?categoria=${cat.slug}`}
                className="group relative bg-white border border-ink/10 rounded-sm overflow-hidden hover:border-signal hover:shadow-md transition-all flex flex-col"
              >
                {/* Image miniature */}
                <div className="relative h-24 bg-paperDark overflow-hidden">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={cat.label[locale] || cat.label.it}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl">
                      {cat.icon}
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Label */}
                <div className="px-2 py-2 flex items-center gap-1.5">
                  <span className="text-base leading-none">{cat.icon}</span>
                  <span className="font-mono text-[10px] text-ink group-hover:text-signal leading-tight line-clamp-2">
                    {cat.label[locale] || cat.label.it}
                  </span>
                </div>
              </Link>
            );
          })}
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

      {/* ── BADGES DE CONFIANCE ──────────────── */}
      <section className="bg-paper border-t border-ink/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.key} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-signal/10 text-signal flex items-center justify-center">
                  {badge.icon}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-ink mb-0.5">
                    {t(`${badge.key}_title`)}
                  </p>
                  <p className="font-mono text-[11px] text-slate leading-relaxed">
                    {t(`${badge.key}_desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}