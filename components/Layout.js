// components/Layout.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { useLocale } from '../lib/locale-context';
import { LOCALES } from '../lib/i18n';

const SITE_NAME = 'Pallet Stock';
const SITE_URL = 'https://www.pallet-stock.it'; // ← remplace par ton vrai domaine

// Mapping locale -> code Open Graph / hreflang
const OG_LOCALE_MAP = { it: 'it_IT', fr: 'fr_FR', en: 'en_GB' };

export default function Layout({
  children,
  title,
  description,
  image, // image spécifique à la page (produit, catégorie...), sinon fallback
  noindex = false,
  type = 'website', // 'product' pour les fiches produit
}) {
  const { t, locale } = useLocale();
  const router = useRouter();

  const pageTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${t('tagline')}`;
  const pageDescription = description || t('hero_subtitle');
  const pagePath = router.asPath.split('?')[0].split('#')[0];
  const canonicalUrl = `${SITE_URL}${pagePath === '/' ? '' : pagePath}`;
  const ogImage = image || `${SITE_URL}/images/og-default.jpg`;

  return (
    <>
      <Head>
        {/* ── Base ─────────────────────────────────────────── */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
        <meta name="author" content={SITE_NAME} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ── Canonical & alternates de langue ────────────── */}
        <link rel="canonical" href={canonicalUrl} />
        {LOCALES.map((code) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={code}
            href={`${SITE_URL}${pagePath === '/' ? '' : pagePath}?lang=${code}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${SITE_URL}${pagePath === '/' ? '' : pagePath}`}
        />

        {/* ── Open Graph ───────────────────────────────────── */}
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={OG_LOCALE_MAP[locale] || 'it_IT'} />
        {LOCALES.filter((c) => c !== locale).map((code) => (
          <meta key={code} property="og:locale:alternate" content={OG_LOCALE_MAP[code]} />
        ))}

        {/* ── Twitter Card ─────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* ── Favicon & icônes ─────────────────────────────── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A0A0A" />

        {/* ── Langue de la page ────────────────────────────── */}
        <meta httpEquiv="content-language" content={locale} />

        {/* ── JSON-LD : Organisation ───────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo.png`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via del Mare 12',
                addressLocality: 'Cagliari',
                postalCode: '09126',
                addressCountry: 'IT',
              },
            }),
          }}
        />

        {/* ── JSON-LD : WebSite + recherche ────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_NAME,
              url: SITE_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/negozio?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-paper">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}