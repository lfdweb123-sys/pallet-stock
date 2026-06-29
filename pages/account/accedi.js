// pages/account/accedi.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Layout from '../../components/Layout';
import { useLocale } from '../../lib/locale-context';
import { auth } from '../../lib/firebase';

const ERROR_MESSAGES = {
  it: {
    'auth/invalid-credential': 'Email o password non corretti.',
    'auth/invalid-email': 'Email non valida.',
    'auth/too-many-requests': 'Troppi tentativi. Riprova più tardi.',
    default: 'Accesso non riuscito. Verifica le tue credenziali.'
  }
};

export default function Accedi() {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/account/ordini');
    } catch (err) {
      const messages = ERROR_MESSAGES.it;
      setError(messages[err.code] || messages.default);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title={t('nav_login')}>
      <section className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display font-bold text-2xl text-ink mb-8">{t('nav_login')}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white border border-ink/10 rounded-sm p-6">
          <div>
            <label className="block text-xs font-medium text-slate mb-1">{t('checkout_email')}</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate mb-1">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
            />
          </div>
          {error && <p className="text-signal text-sm">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="bg-ink text-white font-medium py-3 rounded-sm hover:bg-signal transition-colors disabled:opacity-50"
          >
            {loading ? '…' : t('nav_login')}
          </button>
        </form>
        <p className="text-sm text-slate mt-6 text-center">
          Non hai un account? <Link href="/account/registrati" className="text-signal hover:underline">Registrati</Link>
        </p>
      </section>
    </Layout>
  );
}
