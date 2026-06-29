// components/Layout.js
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useLocale } from '../lib/locale-context';

export default function Layout({ children, title, description }) {
  const { t, locale } = useLocale();
  const pageTitle = title ? `${title} — Pallet Stock` : `Pallet Stock — ${t('tagline')}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || t('hero_subtitle')} />
      </Head>
      <div className="min-h-screen flex flex-col bg-paper">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
