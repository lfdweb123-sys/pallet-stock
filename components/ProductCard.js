// components/ProductCard.js
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '../lib/locale-context';
import { useCart } from '../lib/cart-context';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { t, locale } = useLocale();
  const { addItem } = useCart();
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const lowStock = product.stock <= 6;

  return (
    <div className="group relative bg-white rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Badge sconto */}
      <div className="absolute top-3 left-3 z-10 bg-signal text-white text-xs font-mono font-bold px-2 py-1 rotate-[-3deg] shadow-md">
        -{discount}%
      </div>
      {lowStock && (
        <div className="absolute top-3 right-3 z-10 bg-ink text-paper text-[10px] font-mono px-2 py-1">
          {t('low_stock')}
        </div>
      )}

      {/* Image — object-cover remplit tout le cadre */}
      <Link href={`/prodotto/${product.slug}`} className="block relative aspect-square bg-paperDark overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Ligne perforée façon billet d'entrepôt */}
      <div className="relative h-0 border-t border-dashed border-ink/15 mx-4">
        <span className="absolute -left-6 -top-2 w-4 h-4 rounded-full bg-paper" />
        <span className="absolute -right-6 -top-2 w-4 h-4 rounded-full bg-paper" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="font-mono text-[10px] text-slate mb-1">{product.sku} · {product.brand}</div>
        <Link href={`/prodotto/${product.slug}`}>
          <h3 className="font-display font-semibold text-ink text-sm leading-snug mb-1.5 hover:text-signal transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Étoiles sous le titre */}
        {product.rating != null && (
          <div className="mb-3">
            <StarRating rating={product.rating} count={product.reviewsCount} size="sm" />
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-mono font-bold text-lg text-ink">€{product.price}</span>
            <span className="font-mono text-xs text-slate line-through">€{product.oldPrice}</span>
          </div>
          <div className="text-[11px] text-stock font-medium mb-3">
            {product.stock} {t('in_stock')}
          </div>

          <button
            onClick={() => addItem(product, 1)}
            className="w-full bg-ink text-white text-sm font-medium py-2.5 rounded-sm hover:bg-signal transition-colors"
          >
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
}