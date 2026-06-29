// pages/legale/termini.js
import Layout from '../../components/Layout';
import LegalShell from '../../components/LegalShell';
import { useLocale } from '../../lib/locale-context';

export default function Termini() {
  const { t } = useLocale();
  return (
    <Layout title={t('footer_terms')}>
      <LegalShell title={t('footer_terms')}>
        <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>

        <h2>1. Oggetto</h2>
        <p>
          Le presenti Condizioni Generali di Vendita disciplinano gli acquisti effettuati sul sito Pallet Stock,
          gestito da Pallet Stock, con sede in Via del Mare 12, 09126 Cagliari (CA), Sardegna, Italia.
        </p>

        <h2>2. Prodotti</h2>
        <p>
          Pallet Stock commercializza lotti di elettronica di consumo e grandi elettrodomestici nuovi, provenienti
          da resi commerciali, eccedenze di magazzino e fine serie, a prezzi scontati rispetto al prezzo di listino.
          Le immagini dei prodotti presenti sul sito hanno valore indicativo; il modello effettivamente spedito
          corrisponde alla descrizione testuale e alle specifiche indicate nella scheda prodotto.
        </p>

        <h2>3. Prezzi</h2>
        <p>
          Tutti i prezzi sono espressi in Euro (€) e comprensivi di IVA dove applicabile. Pallet Stock si riserva
          il diritto di modificare i prezzi in qualsiasi momento; il prezzo applicato è quello in vigore al momento
          della conferma dell'ordine.
        </p>

        <h2>4. Ordini e pagamento</h2>
        <p>
          L'ordine si considera confermato al momento della ricezione del pagamento o, per i pagamenti tramite
          bonifico bancario, al momento della creazione dell'ordine con stato "in attesa di bonifico". I metodi
          di pagamento accettati sono: carta di credito/debito, criptovalute e bonifico bancario.
        </p>
        <p>
          Per gli ordini pagati tramite bonifico bancario, la spedizione avviene solo dopo l'accredito dell'importo
          sul conto indicato. L'ordine non confermato entro 7 giorni dalla creazione potrà essere annullato.
        </p>

        <h2>5. Spedizione</h2>
        <p>
          La spedizione è gratuita per l'Italia, la Francia e il resto dell'Europa, salvo diversa indicazione.
          I tempi di consegna indicativi vengono comunicati via email dopo la conferma del pagamento e possono
          variare in base alla disponibilità del corriere e alla destinazione.
        </p>

        <h2>6. Diritto di recesso</h2>
        <p>
          Ai sensi del Codice del Consumo (D.Lgs. 206/2005), il cliente consumatore ha diritto di recedere dal
          contratto entro 14 giorni dalla ricezione del prodotto, senza necessità di motivazione, salvo le
          eccezioni previste dalla legge. Per esercitare il recesso è necessario contattare il servizio clienti
          tramite la pagina Contatti.
        </p>

        <h2>7. Garanzia</h2>
        <p>
          Tutti i prodotti nuovi sono coperti dalla garanzia legale di conformità di 24 mesi prevista dalla
          normativa europea, oltre all'eventuale garanzia del produttore.
        </p>

        <h2>8. Responsabilità</h2>
        <p>
          Pallet Stock non potrà essere ritenuta responsabile per ritardi o inadempimenti dovuti a causa di forza
          maggiore o a fatti imputabili a terzi (corrieri, fornitori di servizi di pagamento).
        </p>

        <h2>9. Legge applicabile</h2>
        <p>Le presenti condizioni sono regolate dalla legge italiana. Per qualsiasi controversia è competente il foro di Cagliari, salvo diversa previsione di legge a tutela del consumatore.</p>
      </LegalShell>
    </Layout>
  );
}
