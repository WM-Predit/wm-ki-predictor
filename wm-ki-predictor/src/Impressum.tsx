export default function Impressum() {
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

      <h1>Impressum</h1>

      <p>Angaben gemäß § 5 DDG</p>

      <p>
        Maximilian Schulz<br />
        Knopheider Weg 16<br />
        32657 Lemgo<br />
        <br />
        E-Mail: max.schulz20.ms@gmail.com
      </p>

      <p>
        Verantwortlich für den Inhalt:<br />
        Maximilian Schulz
      </p>
    </div>
  );
}
