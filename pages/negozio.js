// pages/negozio.js
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useLocale } from '../lib/locale-context';
import { CATEGORIES, getProductsByCategory } from '../lib/products';

const PRODUCTS_PER_PAGE = 12; // multiple de 3 pour la grille 3 col

function getPriceRanges(t) {
  return [
    { label: t('price_all'),    min: 0,    max: Infinity },
    { label: t('price_u50'),    min: 0,    max: 50 },
    { label: t('price_50_150'), min: 50,   max: 150 },
    { label: t('price_150_500'),min: 150,  max: 500 },
    { label: t('price_500_1k'), min: 500,  max: 1000 },
    { label: t('price_o1k'),    min: 1000, max: Infinity },
  ];
}

export default function Negozio() {
  const { t, locale } = useLocale();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activePriceIdx, setActivePriceIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const PRICE_RANGES = getPriceRanges(t);

  useEffect(() => {
    const q = router.query.categoria;
    setActiveCategory(typeof q === 'string' ? q : 'all');
    setPage(1);
  }, [router.query.categoria]);

  useEffect(() => { setPage(1); }, [activeCategory, activePriceIdx, search]);

  function selectCategory(slug) {
    setActiveCategory(slug);
    setSidebarOpen(false);
    router.push(
      slug === 'all' ? '/negozio' : `/negozio?categoria=${slug}`,
      undefined,
      { shallow: true }
    );
  }

  const filtered = useMemo(() => {
    let list = getProductsByCategory(activeCategory);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const name = p.name.toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const desc = (p.description?.[locale] || p.description?.it || '').toLowerCase();
        return name.includes(q) || brand.includes(q) || desc.includes(q);
      });
    }
    const range = PRICE_RANGES[activePriceIdx];
    if (range.min > 0 || range.max !== Infinity) {
      list = list.filter((p) => p.price >= range.min && p.price <= range.max);
    }
    return list;
  }, [activeCategory, activePriceIdx, search, locale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const activeCategoryLabel =
    activeCategory === 'all'
      ? t('filter_all')
      : CATEGORIES.find((c) => c.slug === activeCategory)?.label[locale] ?? activeCategory;

  const hasActiveFilters = activeCategory !== 'all' || activePriceIdx !== 0 || search;

  function resetFilters() {
    selectCategory('all');
    setActivePriceIdx(0);
    setSearch('');
  }

  const SidebarContent = () => (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-slate mb-2 px-2">
          {t('nav_categories')}
        </p>
        <nav className="flex flex-col gap-0.5">
          <SidebarBtn
            active={activeCategory === 'all'}
            onClick={() => selectCategory('all')}
            label={t('filter_all')}
          />
          {CATEGORIES.map((cat) => (
            <SidebarBtn
              key={cat.slug}
              active={activeCategory === cat.slug}
              onClick={() => selectCategory(cat.slug)}
              label={cat.label[locale] || cat.label.it}
            />
          ))}
        </nav>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-slate mb-2 px-2">
          {t('price')}
        </p>
        <nav className="flex flex-col gap-0.5">
          {PRICE_RANGES.map((range, idx) => (
            <SidebarBtn
              key={idx}
              active={activePriceIdx === idx}
              onClick={() => setActivePriceIdx(idx)}
              label={range.label}
            />
          ))}
        </nav>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="mx-2 text-xs text-signal hover:text-signal/70 underline text-left transition-colors font-mono"
        >
          {t('filters_reset')}
        </button>
      )}
    </div>
  );

  return (
    <Layout title={t('nav_shop')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl text-ink mb-1">
            {t('section_all_products')}
          </h1>
          <p className="text-slate text-sm">{t('free_shipping_note')}</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full pl-12 pr-10 py-3 border border-ink/15 bg-white text-ink text-sm placeholder:text-slate focus:outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/10 transition-all rounded-sm font-mono"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-4 flex items-center text-slate hover:text-ink transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile filter button */}
        <div className="lg:hidden flex items-center gap-3 mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-ink/20 text-sm font-mono font-medium text-ink bg-white hover:border-ink transition-colors rounded-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            {t('filters_label')}
          </button>
          <span className="text-sm text-slate font-mono">
            <span className="font-medium text-ink">{activeCategoryLabel}</span>
            {' · '}{filtered.length} {t('results_count')}
          </span>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono font-semibold text-ink">{t('filters_label')}</span>
                <button onClick={() => setSidebarOpen(false)} className="text-slate hover:text-ink">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className="flex gap-8">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-6">
              <SidebarContent />
            </div>
          </aside>

          {/* Products + pagination */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-slate mb-4">
              {filtered.length} {t('results_count')}
              {search && (
                <span> — <span className="text-ink">« {search} »</span></span>
              )}
            </p>

            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <p className="text-ink font-display font-semibold mb-1">{t('no_results_title')}</p>
                <p className="text-slate text-sm font-mono">{t('no_results_text')}</p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="mt-4 text-sm text-signal underline font-mono"
                  >
                    {t('filters_reset')}
                  </button>
                )}
              </div>
            ) : (
              // ── 2 col mobile / 3 col desktop ──────────────────────
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {paginated.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-10">
                <PaginationBtn
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === 1}
                  label="←"
                />
                {buildPageNumbers(page, totalPages).map((item, i) =>
                  item === '…' ? (
                    <span key={`ellipsis-${i}`} className="w-9 text-center text-slate text-sm font-mono select-none">…</span>
                  ) : (
                    <PaginationBtn
                      key={item}
                      onClick={() => { setPage(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      active={item === page}
                      label={String(item)}
                    />
                  )
                )}
                <PaginationBtn
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === totalPages}
                  label="→"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function buildPageNumbers(current, total) {
  const pages = [];
  for (let n = 1; n <= total; n++) {
    if (n === 1 || n === total || Math.abs(n - current) <= 1) {
      pages.push(n);
    } else if (
      (n === current - 2 && current > 3) ||
      (n === current + 2 && current < total - 2)
    ) {
      pages.push('…');
    }
  }
  // deduplicate consecutive ellipsis
  return pages.filter((v, i, arr) => !(v === '…' && arr[i - 1] === '…'));
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SidebarBtn({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-mono transition-colors rounded-sm ${
        active
          ? 'bg-ink text-white'
          : 'text-ink hover:bg-ink/5'
      }`}
    >
      {icon && <span className="text-base leading-none">{icon}</span>}
      <span className="truncate">{label}</span>
    </button>
  );
}

function PaginationBtn({ onClick, disabled, active, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-9 h-9 flex items-center justify-center text-sm font-mono transition-colors rounded-sm
        ${active ? 'bg-ink text-white' : ''}
        ${!active && !disabled ? 'text-ink hover:bg-ink/5 border border-ink/15' : ''}
        ${disabled ? 'text-slate/40 border border-ink/10 cursor-not-allowed' : ''}
      `}
    >
      {label}
    </button>
  );
}