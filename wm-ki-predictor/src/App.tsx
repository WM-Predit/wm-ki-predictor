import { useMemo, useState } from 'react';
import Impressum from './Impressum';
import Datenschutz from './Datenschutz';

type MatchPrediction = {
  match: string;
  score: string;
  home: number;
  draw: number;
  away: number;
  reason: string;
};

const data: Record<string, MatchPrediction[]> = {
  Deutschland: [
    { match: 'Deutschland vs Curaçao', score: '3–0', home: 85, draw: 10, away: 5, reason: 'klare Überlegenheit' },
    { match: 'Deutschland vs Elfenbeinküste', score: '2–1', home: 60, draw: 25, away: 15, reason: 'individuell stärker' },
    { match: 'Deutschland vs Ecuador', score: '2–0', home: 68, draw: 20, away: 12, reason: 'bessere Qualität' }
  ],
  Brasilien: [
    { match: 'Brasilien vs Haiti', score: '3–0', home: 85, draw: 10, away: 5, reason: 'Klassenunterschied' },
    { match: 'Brasilien vs Schottland', score: '2–0', home: 70, draw: 20, away: 10, reason: 'mehr Klasse' },
    { match: 'Brasilien vs Marokko', score: '2–1', home: 60, draw: 25, away: 15, reason: 'effizienter' }
  ],
  Frankreich: [
    { match: 'Frankreich vs Senegal', score: '2–1', home: 60, draw: 25, away: 15, reason: 'individuelle Klasse' },
    { match: 'Frankreich vs Norwegen', score: '2–0', home: 70, draw: 20, away: 10, reason: 'überlegen' },
    { match: 'Frankreich vs Play-off 2', score: '3–0', home: 85, draw: 10, away: 5, reason: 'klar besser' }
  ],
  England: [
    { match: 'England vs Kroatien', score: '2–1', home: 60, draw: 25, away: 15, reason: 'Tempo' },
    { match: 'England vs Panama', score: '3–0', home: 85, draw: 10, away: 5, reason: 'klar überlegen' },
    { match: 'England vs Ghana', score: '2–0', home: 70, draw: 20, away: 10, reason: 'Struktur' }
  ],
  Argentinien: [
    { match: 'Argentinien vs Algerien', score: '2–0', home: 70, draw: 20, away: 10, reason: 'mehr Qualität' },
    { match: 'Argentinien vs Österreich', score: '2–1', home: 60, draw: 25, away: 15, reason: 'effizienter' },
    { match: 'Argentinien vs Jordanien', score: '3–0', home: 85, draw: 10, away: 5, reason: 'klar überlegen' }
  ],
  Spanien: [
    { match: 'Spanien vs Kap Verde', score: '2–0', home: 75, draw: 15, away: 10, reason: 'dominant' },
    { match: 'Spanien vs Uruguay', score: '2–1', home: 55, draw: 25, away: 20, reason: 'technisch stärker' },
    { match: 'Spanien vs Saudi-Arabien', score: '3–0', home: 80, draw: 15, away: 5, reason: 'klar überlegen' }
  ],
  Portugal: [
    { match: 'Portugal vs Kolumbien', score: '2–1', home: 55, draw: 25, away: 20, reason: 'mehr Qualität' },
    { match: 'Portugal vs Usbekistan', score: '3–0', home: 80, draw: 15, away: 5, reason: 'klar überlegen' },
    { match: 'Portugal vs Play-off 1', score: '2–0', home: 75, draw: 15, away: 10, reason: 'besser' }
  ],
  USA: [
    { match: 'USA vs Paraguay', score: '2–1', home: 55, draw: 25, away: 20, reason: 'Tempo Vorteil' },
    { match: 'USA vs Australien', score: '2–0', home: 65, draw: 20, away: 15, reason: 'bessere Offensive' },
    { match: 'USA vs Play-off C', score: '3–0', home: 80, draw: 15, away: 5, reason: 'klar überlegen' }
  ],
  Niederlande: [
    { match: 'Niederlande vs Japan', score: '2–1', home: 55, draw: 25, away: 20, reason: 'mehr Effizienz' },
    { match: 'Niederlande vs Tunesien', score: '2–0', home: 65, draw: 20, away: 15, reason: 'mehr Qualität' },
    { match: 'Niederlande vs Play-off B', score: '2–0', home: 70, draw: 20, away: 10, reason: 'klar besser' }
  ],
  Belgien: [
    { match: 'Belgien vs Ägypten', score: '2–1', home: 60, draw: 25, away: 15, reason: 'Offensiv stärker' },
    { match: 'Belgien vs Iran', score: '2–0', home: 70, draw: 20, away: 10, reason: 'klar überlegen' },
    { match: 'Belgien vs Neuseeland', score: '3–0', home: 85, draw: 10, away: 5, reason: 'Klassenunterschied' }
  ],
  Mexiko: [
    { match: 'Mexiko vs Südafrika', score: '2–1', home: 55, draw: 25, away: 20, reason: 'mehr Erfahrung' },
    { match: 'Mexiko vs Südkorea', score: '1–1', home: 40, draw: 35, away: 25, reason: 'ausgeglichen' },
    { match: 'Mexiko vs Play-off D', score: '2–0', home: 70, draw: 20, away: 10, reason: 'klar überlegen' }
  ],
  Japan: [
    { match: 'Japan vs Niederlande', score: '1–2', home: 20, draw: 25, away: 55, reason: 'unterlegen' },
    { match: 'Japan vs Tunesien', score: '1–1', home: 35, draw: 40, away: 25, reason: 'ausgeglichen' },
    { match: 'Japan vs Play-off B', score: '2–0', home: 65, draw: 20, away: 15, reason: 'überlegen' }
  ]
};

const flags: Record<string, string> = {
  Deutschland: '🇩🇪',
  Brasilien: '🇧🇷',
  Frankreich: '🇫🇷',
  England: '🏴',
  Argentinien: '🇦🇷',
  Spanien: '🇪🇸',
  Portugal: '🇵🇹',
  USA: '🇺🇸',
  Niederlande: '🇳🇱',
  Belgien: '🇧🇪',
  Mexiko: '🇲🇽',
  Japan: '🇯🇵',
  Curaçao: '🇨🇼',
  Elfenbeinküste: '🇨🇮',
  Ecuador: '🇪🇨',
  Haiti: '🇭🇹',
  Schottland: '🏴',
  Marokko: '🇲🇦',
  Senegal: '🇸🇳',
  Norwegen: '🇳🇴',
  Kroatien: '🇭🇷',
  Panama: '🇵🇦',
  Ghana: '🇬🇭',
  Algerien: '🇩🇿',
  Österreich: '🇦🇹',
  Jordanien: '🇯🇴',
  'Kap Verde': '🇨🇻',
  Uruguay: '🇺🇾',
  'Saudi-Arabien': '🇸🇦',
  Kolumbien: '🇨🇴',
  Usbekistan: '🇺🇿',
  Paraguay: '🇵🇾',
  Australien: '🇦🇺',
  Tunesien: '🇹🇳',
  Ägypten: '🇪🇬',
  Iran: '🇮🇷',
  Neuseeland: '🇳🇿',
  Südafrika: '🇿🇦',
  Südkorea: '🇰🇷'
};

const featuredTeams = ['Deutschland', 'Brasilien', 'Frankreich', 'England', 'Argentinien', 'Spanien'];
const allTeams = Object.keys(data).sort((a, b) => a.localeCompare(b, 'de'));

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function splitMatch(match: string) {
  const [home, away] = match.split(' vs ');
  return { home, away };
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="bar-wrap">
      <div className="bar-header">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="bar-track" aria-hidden="true">
        <div className="bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MatchCard({
  prediction,
  isOpen,
  onToggle
}: {
  prediction: MatchPrediction;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const parts = splitMatch(prediction.match);

  return (
    <article className="card match-card">
      <div className="match-top">
        <div>
          <p className="eyebrow">Gruppenspiel</p>
          <h3 className="match-title">
            <span>{flags[parts.home] || '⚽'} {parts.home}</span>
            <span className="versus">vs</span>
            <span>{flags[parts.away] || '⚽'} {parts.away}</span>
          </h3>
        </div>
        <div className="score-chip">{prediction.score}</div>
      </div>

      <div className="hint-box">KI-Hinweis: {prediction.reason}</div>

      <button className="primary-btn" onClick={onToggle}>
        {isOpen ? 'Vorhersage schließen' : 'Vorhersage öffnen'}
      </button>

      {isOpen && (
        <div className="prediction-panel">
          <p className="eyebrow">Vorhergesagtes Ergebnis</p>
          <p className="big-score">{prediction.score}</p>

          <div className="bars">
            <StatBar label={`${flags[parts.home] || '⚽'} ${parts.home}`} value={prediction.home} />
            <StatBar label="🤝 Unentschieden" value={prediction.draw} />
            <StatBar label={`${flags[parts.away] || '⚽'} ${parts.away}`} value={prediction.away} />
          </div>

          <div className="reason-box">
            <strong>Warum diese Prognose?</strong>
            <p>Die aktuelle Einschätzung spricht für dieses Ergebnis wegen {prediction.reason}.</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function App() {
  const path = window.location.pathname;

  if (path === '/impressum') {
    return <Impressum />;
  }

  if (path === '/datenschutz') {
    return <Datenschutz />;
  }

  const [query, setQuery] = useState('');
  const [team, setTeam] = useState('Deutschland');
  const [openMatch, setOpenMatch] = useState<string | null>(null);

  const filteredTeams = useMemo(() => {
    if (!query.trim()) return featuredTeams;
    const normalizedQuery = normalize(query);
    return allTeams.filter((entry) => normalize(entry).includes(normalizedQuery));
  }, [query]);

  const currentMatches = data[team] ?? [];
  const favorite = 'Brasilien';

  return (
    <div className="app-shell">
      <div className="background-overlay" />

      <header className="hero section container">
        <div className="hero-copy">
          <div className="badge">🏆 WM KI Predictor 2026</div>
          <h1>Wer gewinnt die WM 2026?</h1>
          <p className="hero-text">
            Interaktive KI-Vorhersagen für Gruppenspiele mit Ergebnistipps, Wahrscheinlichkeiten und kurzer Analyse.
          </p>

          <div className="stats-row">
            <div className="mini-stat">🏟️ Moderne Web-Version</div>
            <div className="mini-stat">📊 Team-Suche</div>
            <div className="mini-stat">⚽ 3 Spiele pro Team</div>
          </div>
        </div>

        <aside className="search-panel card">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Team auswählen</p>
              <h2>Schnellstart</h2>
            </div>
            <span className="live-chip">Live Preview</span>
          </div>

          <label className="search-box" htmlFor="team-search">
            <span aria-hidden="true">🔎</span>
            <input
              id="team-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="z. B. Frankreich oder Spanien"
            />
          </label>

          <div className="team-grid">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((entry) => (
                <button
                  key={entry}
                  className={`team-button ${team === entry ? 'active' : ''}`}
                  onClick={() => {
                    setTeam(entry);
                    setOpenMatch(null);
                  }}
                >
                  <span>{flags[entry] || '⚽'} {entry}</span>
                  <span>→</span>
                </button>
              ))
            ) : (
              <div className="empty-state">Kein Team gefunden.</div>
            )}
          </div>

          <div className="selected-box">
            <p className="eyebrow">Aktuell ausgewählt</p>
            <h3>{flags[team] || '⚽'} {team}</h3>
            <p>Tippe auf ein Spiel und öffne die zugehörige Vorhersage.</p>
          </div>
        </aside>
      </header>

      <main className="container section content-stack">
        <section className="info-grid">
          <article className="card info-card">
            <p className="eyebrow">Favorit</p>
            <h3>{flags[favorite]} {favorite}</h3>
            <p>Starker Kader, hohe Qualität in der Breite und gute Ausgangslage in den Gruppenspielen.</p>
          </article>

          <article className="card info-card">
            <p className="eyebrow">Beliebte Teams</p>
            <div className="pill-row">
              {featuredTeams.map((entry) => (
                <button
                  key={entry}
                  className="pill"
                  onClick={() => {
                    setTeam(entry);
                    setOpenMatch(null);
                  }}
                >
                  {flags[entry] || '⚽'} {entry}
                </button>
              ))}
            </div>
          </article>

          <article className="card info-card">
            <p className="eyebrow">So funktioniert's</p>
            <ol className="steps">
              <li>Team auswählen</li>
              <li>Spiel öffnen</li>
              <li>KI-Vorhersage ansehen</li>
            </ol>
          </article>
        </section>

        <section>
          <div className="section-head">
            <div>
              <p className="eyebrow">Match Center</p>
              <h2>Deine Gruppenspiele</h2>
            </div>
            <div className="count-box">{currentMatches.length} Spiele verfügbar</div>
          </div>

          <div className="match-grid">
            {currentMatches.map((prediction) => (
              <MatchCard
                key={prediction.match}
                prediction={prediction}
                isOpen={openMatch === prediction.match}
                onToggle={() => setOpenMatch((current) => (current === prediction.match ? null : prediction.match))}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="footer container">
        <div>
          <strong>WM KI Predictor 2026</strong>
          <p>Demo-Webseite auf Basis deiner vorhandenen Idee. Später kann daraus auch eine App entstehen.</p>
        </div>

        <div className="footer-links">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </div>
      </footer>
    </div>
  );
}
