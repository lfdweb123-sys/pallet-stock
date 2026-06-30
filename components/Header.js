// components/Header.js
import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from '../lib/locale-context';
import { useCart } from '../lib/cart-context';
import { useAuth } from '../lib/auth-context';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useLocale();
  const { count } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white">
              PALLET<span className="text-signal">STOCK</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-paper/40 border border-white/15 rounded px-1.5 py-0.5">
              
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 font-body text-sm text-paper/80">
            <Link href="/negozio" className="hover:text-signal transition-colors">{t('nav_shop')}</Link>
            <Link href="/contatti" className="hover:text-signal transition-colors">{t('nav_contact')}</Link>
            {user ? (
              <Link href="/account/ordini" className="hover:text-signal transition-colors">{t('nav_orders')}</Link>
            ) : (
              <Link href="/account/accedi" className="hover:text-signal transition-colors">{t('nav_login')}</Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              href="/carrello"
              className="relative flex items-center gap-1.5 text-paper hover:text-signal transition-colors"
              aria-label={t('nav_cart')}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="9" cy="21" r="1.4" />
                <circle cx="18" cy="21" r="1.4" />
                <path d="M2 3h2l2.6 12.6a1.8 1.8 0 0 0 1.8 1.4h8.7a1.8 1.8 0 0 0 1.8-1.4L21 7H6" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-3 bg-signal text-white text-[10px] font-mono font-bold rounded-full w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-paper"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3 font-body text-sm text-paper/80 border-t border-white/10 pt-3">
            <Link href="/negozio" onClick={() => setOpen(false)}>{t('nav_shop')}</Link>
            <Link href="/contatti" onClick={() => setOpen(false)}>{t('nav_contact')}</Link>
            {user ? (
              <Link href="/account/ordini" onClick={() => setOpen(false)}>{t('nav_orders')}</Link>
            ) : (
              <Link href="/account/accedi" onClick={() => setOpen(false)}>{t('nav_login')}</Link>
            )}
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </header>
  );
}
