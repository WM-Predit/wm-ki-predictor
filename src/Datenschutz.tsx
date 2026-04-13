type Props = {
  lang: 'de' | 'en';
  onBack: () => void;
};

export default function Datenschutz({ lang, onBack }: Props) {
  const isDe = lang === 'de';

  return (
    <div className="legal-page">
      <div className="site-glow site-glow-left" />
      <div className="site-glow site-glow-right" />

      <div className="container">
        <div className="legal-page-card">
          <button className="legal-back-button" onClick={onBack} type="button">
            {isDe ? '← Zurück zur Startseite' : '← Back to homepage'}
          </button>

          <h1>{isDe ? 'Datenschutzerklärung' : 'Privacy Policy'}</h1>

          <h2>{isDe ? 'Hosting' : 'Hosting'}</h2>
          <p>
            {isDe
              ? 'Diese Website wird bei Vercel gehostet. Beim Aufruf der Website können technisch notwendige Daten wie IP-Adresse, Browsertyp, Datum und Uhrzeit verarbeitet werden.'
              : 'This website is hosted on Vercel. When visiting the site, technically required data such as IP address, browser type, date and time may be processed.'}
          </p>

          <h2>{isDe ? 'Zweck der Verarbeitung' : 'Purpose of processing'}</h2>
          <p>
            {isDe
              ? 'Die Verarbeitung dient ausschließlich der Bereitstellung, Stabilität und Sicherheit der Website.'
              : 'This processing is used solely to provide, stabilize and secure the website.'}
          </p>

          <h2>{isDe ? 'Kontakt' : 'Contact'}</h2>
          <p>
            Maximilian Schulz
            <br />
            E-Mail: max.schulz20.ms@gmail.com
          </p>

          <h2>{isDe ? 'Hinweis zu Inhalten' : 'Content notice'}</h2>
          <p>
            {isDe
              ? 'Die auf dieser Website dargestellten Prognosen sind redaktionelle bzw. modellbasierte Einschätzungen und dienen Informationszwecken.'
              : 'The predictions shown on this website are editorial or model-based estimates provided for informational purposes.'}
          </p>
        </div>
      </div>
    </div>
  );
}