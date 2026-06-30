// components/Footer.js
import Link from 'next/link';
import { useLocale } from '../lib/locale-context';

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-steel text-paper/70 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <div className="font-display font-bold text-lg text-white mb-3">
            PALLET<span className="text-signal">STOCK</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">{t('footer_about')}</p>
          <p className="text-xs font-mono mt-4 text-paper/50">
            Via del Mare 12 · 09126 Cagliari (CA) · Sardegna, Italia
          </p>
        </div>

        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-signal mb-3">{t('footer_legal')}</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/legale/privacy" className="hover:text-white">{t('footer_privacy')}</Link></li>
            <li><Link href="/legale/termini" className="hover:text-white">{t('footer_terms')}</Link></li>
            <li><Link href="/legale/cookie" className="hover:text-white">{t('footer_cookies')}</Link></li>
            <li><Link href="/legale/note-legali" className="hover:text-white">{t('footer_legal_notice')}</Link></li>
            <li><Link href="/legale/retour" className="hover:text-white">{t('footer_returns')}</Link></li>
            <li><Link href="/legale/pagamento" className="hover:text-white">{t('footer_payment')}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-signal mb-3">{t('footer_contact')}</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contatti" className="hover:text-white">{t('footer_contact')}</Link></li>
            <li><Link href="/negozio" className="hover:text-white">{t('nav_shop')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-paper/40 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {year} Pallet Stock. {t('footer_rights')}</span>
          <span className="font-mono">P.IVA / VAT — Sardegna, Italia</span>
        </div>
      </div>
    </footer>
  );
}