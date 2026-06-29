// pages/prodotto/[slug].js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useLocale } from '../../lib/locale-context';
import { useCart } from '../../lib/cart-context';
import { getAllProducts, getProductBySlug } from '../../lib/products';

export async function getStaticPaths() {
  const products = getAllProducts();
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}

export default function ProductPage({ product }) {
  const { t, locale } = useLocale();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Layout title={product.name} description={product.description[locale] || product.description.it}>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <nav className="text-xs text-slate mb-6 font-mono">
          <Link href="/negozio" className="hover:text-signal">{t('nav_shop')}</Link> / {product.sku}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative aspect-square bg-paperDark rounded-sm overflow-hidden">
            <div className="absolute top-4 left-4 z-10 bg-signal text-white text-sm font-mono font-bold px-3 py-1.5 rotate-[-3deg] shadow-md">
              -{discount}%
            </div>
            <Image src={product.image} alt={product.name} fill className="object-contain p-12" />
          </div>

          <div className="flex flex-col">
            <div className="font-mono text-xs text-slate mb-2">{product.sku} · {product.brand}</div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-4">{product.name}</h1>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-mono font-bold text-3xl text-ink">€{product.price}</span>
              <span className="font-mono text-base text-slate line-through">€{product.oldPrice}</span>
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

            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm text-slate">{t('qty')}</label>
              <div className="flex items-center border border-ink/15 rounded-sm">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-ink hover:bg-paperDark"
                  aria-label="-"
                >
                  −
                </button>
                <span className="px-4 font-mono">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-ink hover:bg-paperDark"
                  aria-label="+"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="bg-ink text-white font-medium py-3.5 rounded-sm hover:bg-signal transition-colors"
            >
              {added ? '✓' : t('add_to_cart')}
            </button>

            <p className="text-xs text-slate mt-4">{t('free_shipping_note')}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
