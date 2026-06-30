// lib/locale-context.js
import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LOCALE, LOCALES, t as translate } from './i18n';

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ps_locale');
      if (saved && LOCALES.includes(saved)) {
        setLocaleState(saved);
      }
      // Sinon on garde DEFAULT_LOCALE ('it'), sans détection navigateur.
    } catch (e) {
      // localStorage indisponible (SSR ou navigation privée) : on garde le défaut
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next) {
    if (!LOCALES.includes(next)) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem('ps_locale', next);
    } catch (e) {}
  }

  function t(key) {
    return translate(locale, key);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}