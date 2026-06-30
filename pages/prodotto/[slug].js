// pages/prodotto/[slug].js
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import StarRating, { StarIcon } from '../../components/StarRating';
import { useLocale } from '../../lib/locale-context';
import { useCart } from '../../lib/cart-context';
import { getAllProducts, getProductBySlug } from '../../lib/products';

export async function getStaticPaths() {
  const products = getAllProducts();
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { notFound: true };

  // Produits recommandés : même catégorie, max 4, excluant le produit actuel
  const all = getAllProducts();
  const related = all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  // Si pas assez dans la même catégorie, compléter avec d'autres
  const fallback = all
    .filter((p) => p.slug !== product.slug && !related.find((r) => r.slug === p.slug))
    .slice(0, 4 - related.length);

  return { props: { product, related: [...related, ...fallback] } };
}

// ── Zoom image ─────────────────────────────────────────────────────────────
function ZoomableImage({ src, alt }) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square bg-paperDark rounded-sm overflow-hidden cursor-zoom-in select-none"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-contain p-12 transition-transform duration-100"
        style={
          zoom
            ? {
                transform: 'scale(2)',
                transformOrigin: `${pos.x}% ${pos.y}%`,
              }
            : { transform: 'scale(1)' }
        }
      />
      {!zoom && (
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 pointer-events-none">
          <svg className="w-4 h-4 text-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zM11 8v6M8 11h6" />
          </svg>
        </div>
      )}
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────
export default function ProductPage({ product, related }) {
  const { t, locale } = useLocale();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  // Avis : utiliser reviewsList du produit, compléter si vide
  const reviews = product.reviewsList || [];

  // Noms aléatoires mais stables (basés sur le slug)
  const reviewerNames = [
    'Marco B.', 'Sophie L.', 'James T.', 'Elena R.', 'Ahmed K.',
    'Chiara M.', 'Louis D.', 'Sarah P.', 'Davide F.', 'Nina W.',
  ];
  function getReviewerName(idx) {
    const seed = product.slug.charCodeAt(idx % product.slug.length);
    return reviewerNames[(seed + idx) % reviewerNames.length];
  }

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Layout
      title={product.name}
      description={product.description[locale] || product.description.it}
    >
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate mb-6 font-mono">
          <Link href="/negozio" className="hover:text-signal">{t('nav_shop')}</Link>
          {' / '}
          {product.sku}
        </nav>

        {/* ── Produit principal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Image zoomable */}
          <div>
            <div className="absolute top-4 left-4 z-10 bg-signal text-white text-sm font-mono font-bold px-3 py-1.5 rotate-[-3deg] shadow-md pointer-events-none" />
            <ZoomableImage src={product.image} alt={product.name} />
            <p className="text-[10px] text-slate font-mono mt-2 text-center">
              {locale === 'fr' ? 'Survolez pour zoomer' : locale === 'en' ? 'Hover to zoom' : 'Passa il mouse per ingrandire'}
            </p>
          </div>

          {/* Infos produit */}
          <div className="flex flex-col">
            <div className="font-mono text-xs text-slate mb-2">{product.sku} · {product.brand}</div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
              {product.name}
            </h1>

            {/* Étoiles sous le titre */}
            <div className="mb-5">
              <StarRating rating={product.rating} count={product.reviewsCount} size="lg" />
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-mono font-bold text-3xl text-ink">€{product.price}</span>
              <span className="font-mono text-base text-slate line-through">€{product.oldPrice}</span>
              <span className="bg-signal/10 text-signal text-xs font-mono font-bold px-2 py-0.5 rounded-sm">
                -{discount}%
              </span>
            </div>
            <div className="text-sm text-stock font-medium mb-6">
              {t('you_save')} €{(product.oldPrice - product.price).toFixed(0)}
            </div>

            <p className="text-sm text-ink/80 leading-relaxed mb-6 border-t border-dashed border-ink/15 pt-6">
              {product.description[locale] || product.description.it}
            </p>

            <div className="text-xs text-stock font-mono mb-6">
              ● {product.stock} {t('in_stock')}
            </div>

            {/* Quantité */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm text-slate">{t('qty')}</label>
              <div className="flex items-center border border-ink/15 rounded-sm">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-ink hover:bg-paperDark"
                  aria-label="-"
                >−</button>
                <span className="px-4 font-mono">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-ink hover:bg-paperDark"
                  aria-label="+"
                >+</button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="bg-ink text-white font-medium py-3.5 rounded-sm hover:bg-signal transition-colors"
            >
              {added ? '✓ ' + t('add_to_cart') : t('add_to_cart')}
            </button>

            <p className="text-xs text-slate mt-4">{t('free_shipping_note')}</p>
          </div>
        </div>

        {/* ── Avis clients ── */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <div className="border-t border-dashed border-ink/15 pt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-ink">
                  {locale === 'fr' ? 'Avis clients' : locale === 'en' ? 'Customer reviews' : 'Recensioni clienti'}
                </h2>
                <div className="flex items-center gap-2">
                  <StarRating rating={product.rating} count={product.reviewsCount} size="sm" />
                </div>
              </div>

              {/* Barre de résumé */}
              <div className="bg-paperDark rounded-sm p-4 mb-8 flex items-center gap-6">
                <div className="text-center">
                  <div className="font-mono font-bold text-4xl text-ink">{product.rating.toFixed(1)}</div>
                  <StarRating rating={product.rating} size="sm" />
                  <div className="font-mono text-[10px] text-slate mt-1">
                    {product.reviewsCount.toLocaleString()} {locale === 'fr' ? 'avis' : locale === 'en' ? 'reviews' : 'recensioni'}
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    // Distribuer de façon cohérente selon le rating
                    const weights = { 5: 0.6, 4: 0.25, 3: 0.1, 2: 0.03, 1: 0.02 };
                    const pct = Math.round((weights[star] || 0) * 100);
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate w-3">{star}</span>
                        <StarIcon type="full" className="w-3 h-3 text-amber-400" />
                        <div className="flex-1 h-1.5 bg-ink/10 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-slate w-6">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cartes avis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="bg-white border border-ink/8 rounded-sm p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-ink">
                        {getReviewerName(idx)}
                      </span>
                      <StarRating rating={review.stars} size="sm" />
                    </div>
                    <p className="text-sm text-ink/80 leading-relaxed">
                      {review.text[locale] || review.text.it}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Produits recommandés ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="border-t border-dashed border-ink/15 pt-10">
              <h2 className="font-display font-bold text-xl text-ink mb-6">
                {locale === 'fr'
                  ? 'Vous aimerez aussi'
                  : locale === 'en'
                  ? 'You might also like'
                  : 'Potrebbe interessarti'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}