// pages/legale/cookie.js
import Layout from '../../components/Layout';
import LegalShell from '../../components/LegalShell';
import { useLocale } from '../../lib/locale-context';

export default function Cookie() {
  const { t } = useLocale();
  return (
    <Layout title={t('footer_cookies')}>
      <LegalShell title={t('footer_cookies')}>
        <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>

        <h2>1. Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo memorizzati dal browser dell'utente durante la navigazione,
          utilizzati per garantire il corretto funzionamento del sito e migliorare l'esperienza di navigazione.
        </p>

        <h2>2. Cookie utilizzati su Pallet Stock</h2>
        <ul>
          <li><strong>Cookie tecnici necessari:</strong> gestione della sessione, del carrello e della lingua selezionata. Non richiedono consenso.</li>
          <li><strong>Cookie di autenticazione:</strong> gestiti da Firebase Authentication per il login facoltativo all'account cliente.</li>
          <li><strong>Cookie di terze parti — Smartsupp:</strong> il servizio di chat dal vivo Smartsupp utilizza cookie propri per gestire la conversazione con il servizio clienti.</li>
        </ul>

        <h2>3. Gestione delle preferenze</h2>
        <p>
          L'utente può in qualsiasi momento modificare le impostazioni del proprio browser per bloccare o
          eliminare i cookie. La disattivazione dei cookie tecnici potrebbe limitare il corretto funzionamento
          del sito (es. carrello, lingua selezionata, login).
        </p>

        <h2>4. Cookie di terze parti</h2>
        <p>
          Per informazioni dettagliate sui cookie utilizzati da Smartsupp, si rimanda all'informativa privacy
          disponibile sul sito ufficiale del fornitore (smartsupp.com).
        </p>
      </LegalShell>
    </Layout>
  );
}
