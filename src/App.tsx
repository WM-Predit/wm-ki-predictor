import { useEffect, useMemo, useState } from 'react';
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

const ranking = [
  { team: 'Brasilien', chance: 24, summary: 'Breiter Kader, Tempo und hohe individuelle Qualität.' },
  { team: 'Frankreich', chance: 19, summary: 'Tiefe im Kader und starke Besetzung auf Schlüsselpositionen.' },
  { team: 'Deutschland', chance: 16, summary: 'Struktur, Kontrolle und gute Voraussetzungen in der Gruppe.' },
  { team: 'Argentinien', chance: 14, summary: 'Erfahrung, Effizienz und starke Turniermentalität.' }
];

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function splitMatch(match: string) {
  const [home, away] = match.split(' vs ');
  return { home, away };
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-bar">
      <div className="stat-bar-head">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="stat-bar-track" aria-hidden="true">
        <div className="stat-bar-fill" style={{ width: `${value}%` }} />
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
  const maxValue = Math.max(prediction.home, prediction.draw, prediction.away);

  let badge = 'Ausgeglichen';
  if (prediction.home === maxValue && prediction.home >= 75) badge = 'Klarer Favorit';
  if (prediction.draw === maxValue) badge = 'Enges Spiel';
  if (prediction.away === maxValue && prediction.away >= 50) badge = 'Überraschungspotenzial';

  return (
    <article className="match-card-v2">
      <div className="match-card-top">
        <div>
          <p className="section-label">Gruppenspiel</p>
          <h3 className="match-card-title">
            <span>{flags[parts.home] || '⚽'} {parts.home}</span>
            <span className="match-card-vs">vs</span>
            <span>{flags[parts.away] || '⚽'} {parts.away}</span>
          </h3>
        </div>

        <div className="match-card-score">{prediction.score}</div>
      </div>

      <div className="match-card-meta">
        <span className="status-badge">{badge}</span>
        <span className="analysis-tag">Analyse: {prediction.reason}</span>
      </div>

      <button className="cta-button secondary" onClick={onToggle}>
        {isOpen ? 'Weniger anzeigen' : 'Analyse öffnen'}
      </button>

      {isOpen && (
        <div className="match-card-panel">
          <p className="section-label">Wahrscheinlichkeiten</p>
          <p className="result-number">{prediction.score}</p>

          <div className="stat-bars">
            <StatBar label={`${flags[parts.home] || '⚽'} ${parts.home}`} value={prediction.home} />
            <StatBar label="Unentschieden" value={prediction.draw} />
            <StatBar label={`${flags[parts.away] || '⚽'} ${parts.away}`} value={prediction.away} />
          </div>

          <div className="panel-note">
            <strong>Begründung</strong>
            <p>Die aktuelle Einschätzung spricht für dieses Ergebnis wegen {prediction.reason}.</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.hash || '#/');
  const [query, setQuery] = useState('');
  const [team, setTeam] = useState('Deutschland');
  const [openMatch, setOpenMatch] = useState<string | null>(null);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '/';
    }

    const handleRouteChange = () => setPath(window.location.hash || '#/');
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  const filteredTeams = useMemo(() => {
    if (!query.trim()) return allTeams;
    const normalizedQuery = normalize(query);
    return allTeams.filter((entry) => normalize(entry).includes(normalizedQuery));
  }, [query]);

  const currentMatches = data[team] ?? [];
  const heroTopMatch = data['Brasilien'][0];

  if (path === '#/impressum') return <Impressum />;
  if (path === '#/datenschutz') return <Datenschutz />;

  return (
    <div className="site-shell">
      <div className="site-glow site-glow-left" />
      <div className="site-glow site-glow-right" />

      <header className="topbar-wrap">
        <div className="container topbar">
          <div className="brand">
            <div className="brand-mark">WM</div>
            <div>
              <strong>WM KI Predictor</strong>
              <p>Professionelle Turnier-Prognosen</p>
            </div>
          </div>

          <nav className="topnav">
            <button onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}>
              Favoriten
            </button>
            <button onClick={() => document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' })}>
              Teams
            </button>
            <button onClick={() => document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' })}>
              Match Center
            </button>
          </nav>
        </div>
      </header>

      <main className="container main-layout">
        <section className="hero-v2">
          <div className="hero-panel">
            <div className="hero-kicker">WM 2026 Prognoseplattform</div>
            <h1>Fußball-Prognosen, die wie ein echtes Produkt aussehen.</h1>
            <p className="hero-description">
              Moderne Vorschau auf Gruppenspiele, Wahrscheinlichkeiten, Favoriten und Match-Analysen
              in einem klaren, hochwertigen Interface.
            </p>

            <div className="hero-actions">
              <button
                className="cta-button"
                onClick={() => document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Zum Match Center
              </button>

              <button
                className="ghost-button"
                onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Favoriten ansehen
              </button>
            </div>

            <div className="hero-metrics">
              <div className="metric-card">
                <strong>12</strong>
                <span>Teams</span>
              </div>
              <div className="metric-card">
                <strong>36</strong>
                <span>Prognosen</span>
              </div>
              <div className="metric-card">
                <strong>2026</strong>
                <span>Preview</span>
              </div>
            </div>
          </div>

          <aside className="hero-highlight">
            <p className="section-label">Top-Prognose</p>
            <h2>{heroTopMatch.match}</h2>
            <div className="hero-highlight-score">{heroTopMatch.score}</div>
            <p className="hero-highlight-text">
              Brasilien zählt aktuell zu den stärksten Turnierfavoriten und startet mit einer sehr klaren Projektion.
            </p>

            <div className="highlight-bars">
              <StatBar label="Brasilien" value={heroTopMatch.home} />
              <StatBar label="Unentschieden" value={heroTopMatch.draw} />
              <StatBar label="Haiti" value={heroTopMatch.away} />
            </div>
          </aside>
        </section>

        <section className="overview-grid">
          <article className="overview-card dark">
            <p className="section-label">Plattform-Fokus</p>
            <h3>Klare WM-Prognosen statt unübersichtlicher Daten</h3>
            <p>
              Die Seite bündelt Team-Auswahl, Spielprognosen, Resultate und kurze Analysen
              in einer kompakten, modernen Oberfläche.
            </p>
          </article>

          <article className="overview-card">
            <p className="section-label">Top-Team</p>
            <h3>{flags.Brasilien} Brasilien</h3>
            <p>Starke Einzelspieler, Tiefe im Kader und hohe Titelwahrscheinlichkeit.</p>
          </article>

          <article className="overview-card">
            <p className="section-label">Nächster Ausbau</p>
            <h3>Mehr Teams, KO-Runde, Live-Daten</h3>
            <p>Die Struktur ist bereit für größere Inhalte und spätere Datenquellen.</p>
          </article>
        </section>

        <section id="ranking" className="section-block">
          <div className="section-header-v2">
            <div>
              <p className="section-label">Favoriten-Ranking</p>
              <h2>Die stärksten Titelkandidaten</h2>
            </div>
            <span className="header-chip">Preview 2026</span>
          </div>

          <div className="ranking-list">
            {ranking.map((entry, index) => (
              <article key={entry.team} className="ranking-item">
                <div className="ranking-number">0{index + 1}</div>

                <div className="ranking-main">
                  <h3>{flags[entry.team]} {entry.team}</h3>
                  <p>{entry.summary}</p>
                </div>

                <div className="ranking-side">
                  <strong>{entry.chance}%</strong>
                  <span>Titelchance</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="teams" className="section-block">
          <div className="section-header-v2">
            <div>
              <p className="section-label">Teams</p>
              <h2>Team auswählen</h2>
            </div>
            <span className="header-chip">{filteredTeams.length} sichtbar</span>
          </div>

          <div className="team-explorer">
            <div className="team-search-box">
              <span>🔎</span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nach Team suchen"
              />
            </div>

            <div className="featured-row">
              {featuredTeams.map((entry) => (
                <button
                  key={entry}
                  className={`featured-chip ${team === entry ? 'active' : ''}`}
                  onClick={() => {
                    setTeam(entry);
                    setOpenMatch(null);
                  }}
                >
                  {flags[entry]} {entry}
                </button>
              ))}
            </div>

            <div className="team-list-grid">
              {filteredTeams.map((entry) => (
                <button
                  key={entry}
                  className={`team-list-item ${team === entry ? 'active' : ''}`}
                  onClick={() => {
                    setTeam(entry);
                    setOpenMatch(null);
                  }}
                >
                  <span>{flags[entry] || '⚽'} {entry}</span>
                  <span>→</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="matches" className="section-block">
          <div className="section-header-v2">
            <div>
              <p className="section-label">Match Center</p>
              <h2>Prognosen für {flags[team] || '⚽'} {team}</h2>
            </div>
            <span className="header-chip">{currentMatches.length} Spiele</span>
          </div>

          <div className="match-layout">
            <aside className="match-sidebar">
              <p className="section-label">Ausgewähltes Team</p>
              <h3>{flags[team] || '⚽'} {team}</h3>
              <p>
                Öffne ein Spiel, um Ergebnis-Tipp, Wahrscheinlichkeiten und Begründung zu sehen.
              </p>

              <div className="sidebar-box">
                <strong>Was diese Ansicht zeigt</strong>
                <ul>
                  <li>Prognostiziertes Ergebnis</li>
                  <li>Verteilung der Wahrscheinlichkeiten</li>
                  <li>Kurze Begründung zur Einschätzung</li>
                </ul>
              </div>
            </aside>

            <div className="match-cards-grid">
              {currentMatches.map((prediction) => (
                <MatchCard
                  key={prediction.match}
                  prediction={prediction}
                  isOpen={openMatch === prediction.match}
                  onToggle={() =>
                    setOpenMatch((current) => (current === prediction.match ? null : prediction.match))
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <section className="faq-strip">
          <article className="faq-card">
            <p className="section-label">FAQ</p>
            <h3>Wie entstehen die Prognosen?</h3>
            <p>Durch eine vereinfachte datenbasierte Einschätzung aus Teamstärke, Qualität und Wahrscheinlichkeiten.</p>
          </article>

          <article className="faq-card">
            <p className="section-label">Hinweis</p>
            <h3>Sind das Live-Daten?</h3>
            <p>Aktuell ist die Seite eine hochwertige Vorschau mit vorbereiteten Projektionen und UI-Struktur.</p>
          </article>

          <article className="faq-card">
            <p className="section-label">Roadmap</p>
            <h3>Was kommt als Nächstes?</h3>
            <p>Mehr Teams, komplette Gruppen, KO-Runden, Teamseiten und später dynamische Datenquellen.</p>
          </article>
        </section>

        <footer className="footer-v2">
          <div>
            <strong>WM KI Predictor 2026</strong>
            <p>Moderne Vorschau-Plattform für Spielprognosen, Favoriten und datenbasierte Turnier-Einschätzungen.</p>
          </div>

          <div className="footer-v2-links">
            <button onClick={() => { window.location.hash = '/impressum'; }}>
              Impressum
            </button>
            <button onClick={() => { window.location.hash = '/datenschutz'; }}>
              Datenschutz
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}