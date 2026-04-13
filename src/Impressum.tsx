type Props = {
  lang: 'de' | 'en';
  onBack: () => void;
};

export default function Impressum({ lang, onBack }: Props) {
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

          <h1>{isDe ? 'Impressum' : 'Legal Notice'}</h1>

          <p className="section-label">
            {isDe ? 'Angaben gemäß § 5 DDG' : 'Information according to § 5 DDG'}
          </p>

          <h2>{isDe ? 'Anbieter' : 'Provider'}</h2>
          <p>
            Maximilian Schulz
            <br />
            Knopheider Weg 16
            <br />
            32657 Lemgo
            <br />
            Germany
            <br />
            <br />
            E-Mail: max.schulz20.ms@gmail.com
          </p>

          <h2>{isDe ? 'Verantwortlich für den Inhalt' : 'Responsible for content'}</h2>
          <p>Maximilian Schulz</p>

          <h2>{isDe ? 'Hinweis' : 'Note'}</h2>
          <p>
            {isDe
              ? 'Diese Seite dient als redaktionelle und datenbasierte Vorschau auf mögliche Spielverläufe und Ergebnisse. Es handelt sich nicht um garantierte Aussagen über tatsächliche Resultate.'
              : 'This website provides editorial and data-based previews of potential match outcomes and scorelines. It does not guarantee actual results.'}
          </p>
        </div>
      </div>
    </div>
  );
}