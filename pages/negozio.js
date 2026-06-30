// pages/negozio.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useLocale } from '../lib/locale-context';
import { CATEGORIES, getProductsByCategory } from '../lib/products';

export default function Negozio() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [active, setActive] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const q = router.query.categoria;
    if (typeof q === 'string') setActive(q);
    else setActive('all');
  }, [router.query.categoria]);

  const products = getProductsByCategory(active);

  function selectCategory(slug) {
    setActive(slug);
    setSidebarOpen(false);
    router.push(
      slug === 'all' ? '/negozio' : `/negozio?categoria=${slug}`,
      undefined,
      { shallow: true }
    );
  }

  const activeLabel =
    active === 'all'
      ? t('filter_all')
      : CATEGORIES.find((c) => c.slug === active)?.label[locale] ?? active;

  const SidebarContent = () => (
    <nav className="flex flex-col gap-1">
      <button
        onClick={() => selectCategory('all')}
        className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          active === 'all'
            ? 'bg-ink text-white'
            : 'text-ink hover:bg-ink/5'
        }`}
      >
        <span>🛍️</span>
        <span>{t('filter_all')}</span>
        {active === 'all' && (
          <span className="ml-auto text-xs font-normal opacity-70">{products.length}</span>
        )}
      </button>

      {CATEGORIES.map((cat) => {
        const isActive = active === cat.slug;
        const count = isActive ? products.length : null;
        return (
          <button
            key={cat.slug}
            onClick={() => selectCategory(cat.slug)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-ink text-white'
                : 'text-ink hover:bg-ink/5'
            }`}
          >
            <span>{cat.icon}</span>
            <span className="truncate">{cat.label[locale] || cat.label.it}</span>
            {isActive && (
              <span className="ml-auto text-xs font-normal opacity-70">{count}</span>
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <Layout title={t('nav_shop')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-ink mb-1">
            {t('section_all_products')}
          </h1>
          <p className="text-slate text-sm">{t('free_shipping_note')}</p>
        </div>

        {/* Mobile: filtre actif + bouton ouvrir sidebar */}
        <div className="lg:hidden flex items-center gap-3 mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-ink/20 text-sm font-medium text-ink bg-white hover:border-ink transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Catégories
          </button>
          <span className="text-sm text-slate">
            <span className="font-medium text-ink">{activeLabel}</span>
            {' '}· {products.length} produit{products.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <span className="font-semibold text-ink">Catégories</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-slate hover:text-ink"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Layout principal */}
        <div className="flex gap-8">

          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate mb-3 px-3">
                Catégories
              </p>
              <SidebarContent />
            </div>
          </aside>

          {/* Grille produits */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate mb-4">
              {products.length} produit{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}