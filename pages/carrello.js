// pages/carrello.js
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { useLocale } from '../lib/locale-context';
import { useCart } from '../lib/cart-context';

export default function Carrello() {
  const { t } = useLocale();
  const { items, removeItem, updateQty, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <Layout title={t('cart_title')}>
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="font-display font-bold text-2xl text-ink mb-3">{t('cart_title')}</h1>
          <p className="text-slate mb-8">{t('cart_empty')}</p>
          <Link href="/negozio" className="inline-block bg-ink text-white px-6 py-3 rounded-sm hover:bg-signal transition-colors">
            {t('cart_continue')}
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title={t('cart_title')}>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-8">{t('cart_title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.slug} className="flex gap-4 bg-white border border-ink/10 rounded-sm p-4">
                <div className="relative w-20 h-20 bg-paperDark rounded-sm flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="font-mono text-[10px] text-slate">{item.sku}</div>
                  <Link href={`/prodotto/${item.slug}`} className="font-medium text-sm text-ink hover:text-signal">
                    {item.name}
                  </Link>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-ink/15 rounded-sm">
                      <button onClick={() => updateQty(item.slug, item.qty - 1)} className="px-2.5 py-1 hover:bg-paperDark">−</button>
                      <span className="px-3 font-mono text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.slug, item.qty + 1)} className="px-2.5 py-1 hover:bg-paperDark">+</button>
                    </div>
                    <span className="font-mono font-bold text-ink">€{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-slate hover:text-signal text-xs self-start"
                  aria-label={t('cart_remove')}
                >
                  ✕
                </button>
              </div>
            ))}
            <Link href="/negozio" className="text-sm text-signal hover:underline mt-2">
              ← {t('cart_continue')}
            </Link>
          </div>

          <div className="bg-white border border-ink/10 rounded-sm p-6 h-fit">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate">{t('cart_subtotal')}</span>
              <span className="font-mono">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-slate">{t('cart_shipping')}</span>
              <span className="text-stock font-medium">{t('cart_shipping_free')}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-dashed border-ink/15 pt-4 mb-6">
              <span>{t('cart_total')}</span>
              <span className="font-mono">€{subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="block text-center bg-signal text-white font-medium py-3.5 rounded-sm hover:bg-signalDark transition-colors"
            >
              {t('cart_checkout')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
