// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%231B1D1F%22/><text x=%2250%22 y=%2265%22 font-size=%2255%22 fill=%22%23FF5A1F%22 text-anchor=%22middle%22 font-family=%22monospace%22>P</text></svg>" />
        <meta name="theme-color" content="#1B1D1F" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
