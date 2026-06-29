// pages/legale/note-legali.js
import Layout from '../../components/Layout';
import LegalShell from '../../components/LegalShell';
import { useLocale } from '../../lib/locale-context';

export default function NoteLegali() {
  const { t } = useLocale();
  return (
    <Layout title={t('footer_legal_notice')}>
      <LegalShell title={t('footer_legal_notice')}>
        <h2>Editore del sito</h2>
        <p>
          <strong>Pallet Stock</strong><br />
          Via del Mare 12<br />
          09126 Cagliari (CA), Sardegna, Italia
        </p>

        <h2>Contatti</h2>
        <p>Per qualsiasi richiesta, consultare la pagina <a href="/contatti" className="text-signal underline">Contatti</a>.</p>

        <h2>Hosting</h2>
        <p>Il sito è ospitato da Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Stati Uniti.</p>

        <h2>Proprietà intellettuale</h2>
        <p>
          Il contenuto del sito (testi, immagini, marchio "Pallet Stock") è protetto dalle leggi sulla proprietà
          intellettuale. Qualsiasi riproduzione non autorizzata è vietata.
        </p>
      </LegalShell>
    </Layout>
  );
}
