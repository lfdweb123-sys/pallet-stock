// pages/account/registrati.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Layout from '../../components/Layout';
import { useLocale } from '../../lib/locale-context';
import { auth } from '../../lib/firebase';

const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'Questa email è già registrata.',
  'auth/invalid-email': 'Email non valida.',
  'auth/weak-password': 'La password deve contenere almeno 6 caratteri.',
  default: 'Registrazione non riuscita. Riprova.'
};

export default function Registrati() {
  const { t } = useLocale();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      router.push('/account/ordini');
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || ERROR_MESSAGES.default);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Crea un account">
      <section className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display font-bold text-2xl text-ink mb-8">Crea un account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white border border-ink/10 rounded-sm p-6">
          <div>
            <label className="block text-xs font-medium text-slate mb-1">Nome</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
            />
          </div>
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
              type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm focus:border-signal outline-none"
            />
          </div>
          {error && <p className="text-signal text-sm">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="bg-ink text-white font-medium py-3 rounded-sm hover:bg-signal transition-colors disabled:opacity-50"
          >
            {loading ? '…' : 'Crea account'}
          </button>
        </form>
        <p className="text-sm text-slate mt-6 text-center">
          Hai già un account? <Link href="/account/accedi" className="text-signal hover:underline">Accedi</Link>
        </p>
      </section>
    </Layout>
  );
}
