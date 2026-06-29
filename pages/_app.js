// pages/_app.js
import '../styles/globals.css';
import { LocaleProvider } from '../lib/locale-context';
import { CartProvider } from '../lib/cart-context';
import { AuthProvider } from '../lib/auth-context';

export default function App({ Component, pageProps }) {
  return (
    <LocaleProvider>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}
