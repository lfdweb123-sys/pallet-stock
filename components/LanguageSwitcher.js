// components/LanguageSwitcher.js
import { useLocale } from '../lib/locale-context';
import { LOCALES, LOCALE_LABELS } from '../lib/i18n';

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {LOCALES.map((code) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          aria-current={locale === code}
          className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
            locale === code
              ? 'bg-signal text-white'
              : 'text-paper/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
