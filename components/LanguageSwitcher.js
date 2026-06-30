// components/LanguageSwitcher.js
import { useState, useRef, useEffect } from 'react';
import { useLocale } from '../lib/locale-context';
import { LOCALES } from '../lib/i18n';

const LOCALE_OPTIONS = {
  it: { label: 'Italiano', flag: '🇮🇹' },
  fr: { label: 'Français', flag: '🇫🇷' },
  en: { label: 'English',  flag: '🇬🇧' },
};

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Ferme le menu si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = LOCALE_OPTIONS[locale];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono rounded transition-colors text-paper/70 hover:text-white hover:bg-white/10"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Langue"
          className="absolute right-0 mt-1 w-36 rounded shadow-lg bg-ink border border-white/10 overflow-hidden z-50"
        >
          {LOCALES.map((code) => {
            const opt = LOCALE_OPTIONS[code];
            const isActive = code === locale;
            return (
              <li key={code} role="option" aria-selected={isActive}>
                <button
                  onClick={() => { setLocale(code); setOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors ${
                    isActive
                      ? 'bg-signal text-white'
                      : 'text-paper/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-base leading-none">{opt.flag}</span>
                  <span>{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}