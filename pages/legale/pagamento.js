// pages/legale/pagamento.js
import Layout from '../../components/Layout';
import LegalShell from '../../components/LegalShell';
import { useLocale } from '../../lib/locale-context';

export default function Pagamento() {
  const { t } = useLocale();
  return (
    <Layout title={t('footer_payment')}>
      <LegalShell title={t('footer_payment')}>
        <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>

        <h2>1. Metodi di pagamento accettati</h2>
        <p>Pallet Stock accetta i seguenti metodi di pagamento:</p>
        <ul>
          <li><strong>Carta di credito/debito</strong> — pagamento immediato e sicuro tramite GeniusPay;</li>
          <li><strong>Criptovalute</strong> — Bitcoin, USDT e altre crypto tramite NowPayments;</li>
          <li><strong>Bonifico bancario</strong> — le coordinate vengono fornite dopo la conferma dell'ordine.</li>
        </ul>

        <h2>2. Pagamento con carta o criptovaluta</h2>
        <p>
          I pagamenti con carta o criptovaluta sono elaborati immediatamente tramite i nostri fornitori di servizi
          di pagamento. L'ordine viene confermato e preparato per la spedizione non appena il pagamento è approvato.
        </p>

        <h2>3. Pagamento con bonifico bancario</h2>
        <p>
          In caso di pagamento tramite bonifico bancario, l'ordine viene messo in attesa fino alla ricezione del
          pagamento. Le coordinate bancarie vengono inviate via email subito dopo la conferma dell'ordine.
          La spedizione viene effettuata non appena il bonifico è accreditato sul nostro conto, generalmente
          entro 2-5 giorni lavorativi dall'invio del bonifico.
        </p>

        <h2>4. Sicurezza dei pagamenti</h2>
        <p>
          Tutte le transazioni sono protette tramite protocolli di cifratura standard del settore (HTTPS/SSL).
          Pallet Stock non memorizza i dati della carta di credito, che sono gestiti esclusivamente dai nostri
          fornitori di servizi di pagamento certificati.
        </p>

        <h2>5. Valuta e fatturazione</h2>
        <p>
          Tutti i prezzi sono espressi in Euro (€) e includono l'IVA dove applicabile. Una conferma d'ordine
          viene inviata via email dopo ogni acquisto.
        </p>

        <h2>6. Problemi di pagamento</h2>
        <p>
          In caso di pagamento non riuscito o di domande relative alla fatturazione, contattare il nostro
          servizio assistenza tramite la pagina Contatti o la chat in basso a destra.
        </p>
      </LegalShell>
    </Layout>
  );
}