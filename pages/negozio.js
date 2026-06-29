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

  useEffect(() => {
    const q = router.query.categoria;
    if (typeof q === 'string') setActive(q);
  }, [router.query.categoria]);

  const products = getProductsByCategory(active);

  function selectCategory(slug) {
    setActive(slug);
    router.push(slug === 'all' ? '/negozio' : `/negozio?categoria=${slug}`, undefined, { shallow: true });
  }

  return (
    <Layout title={t('nav_shop')}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display font-bold text-3xl text-ink mb-2">{t('section_all_products')}</h1>
        <p className="text-slate text-sm mb-8">{t('free_shipping_note')}</p>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => selectCategory('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              active === 'all' ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-ink/15 hover:border-ink'
            }`}
          >
            {t('filter_all')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => selectCategory(cat.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === cat.slug ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-ink/15 hover:border-ink'
              }`}
            >
              {cat.icon} {cat.label[locale] || cat.label.it}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
