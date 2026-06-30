// pages/legale/retour.js
import Layout from '../../components/Layout';
import LegalShell from '../../components/LegalShell';
import { useLocale } from '../../lib/locale-context';

export default function Retour() {
  const { t } = useLocale();
  return (
    <Layout title={t('footer_returns')}>
      <LegalShell title={t('footer_returns')}>
        <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>

        <h2>1. Diritto di reso</h2>
        <p>
          Il cliente ha diritto di restituire i prodotti acquistati su Pallet Stock entro <strong>30 giorni</strong>
          dalla data di consegna, anche se il prodotto è stato aperto o utilizzato, senza necessità di fornire
          una motivazione.
        </p>

        <h2>2. Come richiedere un reso</h2>
        <p>
          Per richiedere un reso, contattare il nostro servizio assistenza tramite la pagina Contatti o la chat,
          indicando il numero d'ordine e il prodotto da restituire. Forniremo le istruzioni per la spedizione di reso.
        </p>

        <h2>3. Condizioni del reso</h2>
        <ul>
          <li>Il prodotto deve essere restituito nella confezione originale, se possibile, e in condizioni che ne consentano la rivendita o la riparazione;</li>
          <li>Le spese di spedizione del reso sono a carico del cliente, salvo nei casi di prodotto difettoso o non conforme;</li>
          <li>Il rimborso viene effettuato con lo stesso metodo di pagamento utilizzato per l'acquisto.</li>
        </ul>

        <h2>4. Tempistiche di rimborso</h2>
        <p>
          Il rimborso viene elaborato entro 14 giorni lavorativi dalla ricezione e verifica del prodotto restituito.
        </p>

        <h2>5. Prodotti difettosi</h2>
        <p>
          In caso di prodotto difettoso o danneggiato alla consegna, il cliente può richiedere la sostituzione
          gratuita o il rimborso integrale, incluse le spese di spedizione del reso.
        </p>

        <h2>6. Contatti</h2>
        <p>
          Per qualsiasi domanda relativa al reso, contattare il nostro servizio assistenza tramite la pagina Contatti
          o la chat in basso a destra.
        </p>
      </LegalShell>
    </Layout>
  );
}