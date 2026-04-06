export default function Datenschutz() {
  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={() => {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
      >
        ← Zurück
      </button>

      <h1>Datenschutzerklärung</h1>

      <p>
        Diese Website wird bei Vercel gehostet. Beim Aufruf der Website können
        technische Daten wie IP-Adresse, Browsertyp, Datum und Uhrzeit erfasst werden.
      </p>

      <p>
        Diese Daten dienen ausschließlich der Bereitstellung und Sicherheit der Website.
      </p>

      <p>
        Kontakt:<br />
        Maximilian Schulz<br />
        E-Mail: max.schulz20.ms@gmail.com
      </p>
    </div>
  );
}
