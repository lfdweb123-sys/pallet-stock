// pages/legale/privacy.js
import Layout from '../../components/Layout';
import LegalShell from '../../components/LegalShell';
import { useLocale } from '../../lib/locale-context';

export default function Privacy() {
  const { t } = useLocale();
  return (
    <Layout title={t('footer_privacy')}>
      <LegalShell title={t('footer_privacy')}>
        <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>

        <h2>1. Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento dei dati personali raccolti tramite il sito Pallet Stock è:
          <br /><strong>Pallet Stock</strong> — Via del Mare 12, 09126 Cagliari (CA), Sardegna, Italia.
        </p>

        <h2>2. Dati raccolti</h2>
        <p>Nell'ambito dell'utilizzo del sito raccogliamo le seguenti categorie di dati:</p>
        <ul>
          <li>Dati identificativi e di contatto forniti durante l'ordine (nome, cognome, email, telefono, indirizzo di spedizione);</li>
          <li>Dati relativi all'ordine (prodotti acquistati, importo, metodo di pagamento, stato della transazione);</li>
          <li>Dati tecnici di navigazione (indirizzo IP, tipo di browser, pagine visitate) raccolti tramite cookie — vedi la nostra Cookie Policy;</li>
          <li>Dati di account, se l'utente crea volontariamente un profilo (email e password, gestiti tramite Firebase Authentication).</li>
        </ul>

        <h2>3. Finalità del trattamento</h2>
        <p>I dati personali sono trattati per le seguenti finalità:</p>
        <ul>
          <li>Gestione ed esecuzione degli ordini, inclusa la fatturazione e la spedizione;</li>
          <li>Elaborazione dei pagamenti tramite i nostri fornitori di servizi di pagamento (carta, criptovalute, bonifico bancario);</li>
          <li>Comunicazioni relative all'ordine (conferme, aggiornamenti di spedizione, assistenza clienti);</li>
          <li>Adempimento di obblighi legali e fiscali;</li>
          <li>Gestione dell'account cliente, se creato.</li>
        </ul>

        <h2>4. Base giuridica</h2>
        <p>
          Il trattamento si basa sull'esecuzione del contratto di vendita (art. 6.1.b GDPR), sull'adempimento di obblighi
          legali (art. 6.1.c GDPR) e, per le comunicazioni promozionali eventuali, sul consenso dell'interessato (art. 6.1.a GDPR).
        </p>

        <h2>5. Destinatari dei dati</h2>
        <p>I dati possono essere comunicati a:</p>
        <ul>
          <li>Fornitori di servizi di pagamento (Stripe per i pagamenti con carta, NowPayments per i pagamenti in criptovaluta);</li>
          <li>Fornitore del servizio di posta elettronica transazionale (Brevo);</li>
          <li>Fornitore di hosting e infrastruttura (V.);</li>
          <li>Fornitore del servizio di live chat (Smartsupp);</li>
          <li>Corrieri e operatori logistici per la consegna degli ordini;</li>
          <li>Autorità competenti, su richiesta, nei limiti previsti dalla legge.</li>
        </ul>

        <h2>6. Conservazione dei dati</h2>
        <p>
          I dati relativi agli ordini sono conservati per il tempo necessario agli adempimenti fiscali e contabili previsti
          dalla normativa italiana (10 anni). I dati dell'account sono conservati fino alla richiesta di cancellazione
          da parte dell'utente.
        </p>

        <h2>7. Diritti dell'interessato</h2>
        <p>
          In conformità al Regolamento (UE) 2016/679 (GDPR), l'utente ha diritto di accesso, rettifica, cancellazione,
          limitazione del trattamento, portabilità dei dati e opposizione. Le richieste possono essere inviate
          all'indirizzo email indicato nella pagina Contatti.
        </p>

        <h2>8. Sicurezza</h2>
        <p>
          Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati,
          perdita o divulgazione, inclusa la cifratura delle comunicazioni (HTTPS) e l'accesso riservato ai dati di pagamento.
        </p>
      </LegalShell>
    </Layout>
  );
}

