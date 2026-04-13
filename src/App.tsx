import { useEffect, useMemo, useState } from 'react';
import Impressum from './Impressum';
import Datenschutz from './Datenschutz';

type Lang = 'de' | 'en';

type MatchPrediction = {
  match: string;
  score: string;
  home: number;
  draw: number;
  away: number;
  reason: {
    de: string;
    en: string;
  };
};

const data: Record<string, MatchPrediction[]> = {
  Deutschland: [
    {
      match: 'Deutschland vs Curaçao',
      score: '3:0',
      home: 85,
      draw: 10,
      away: 5,
      reason: { de: 'klare Überlegenheit', en: 'clear superiority' }
    },
    {
      match: 'Deutschland vs Elfenbeinküste',
      score: '2:1',
      home: 60,
      draw: 25,
      away: 15,
      reason: { de: 'individuell stärker', en: 'stronger individual quality' }
    },
    {
      match: 'Deutschland vs Ecuador',
      score: '2:0',
      home: 68,
      draw: 20,
      away: 12,
      reason: { de: 'bessere Qualität', en: 'higher overall quality' }
    }
  ],
  Brasilien: [
    {
      match: 'Brasilien vs Haiti',
      score: '3:0',
      home: 85,
      draw: 10,
      away: 5,
      reason: { de: 'Klassenunterschied', en: 'clear quality gap' }
    },
    {
      match: 'Brasilien vs Schottland',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'mehr Klasse', en: 'more attacking quality' }
    },
    {
      match: 'Brasilien vs Marokko',
      score: '2:1',
      home: 60,
      draw: 25,
      away: 15,
      reason: { de: 'effizienter', en: 'more efficient in key moments' }
    }
  ],
  Frankreich: [
    {
      match: 'Frankreich vs Senegal',
      score: '2:1',
      home: 60,
      draw: 25,
      away: 15,
      reason: { de: 'individuelle Klasse', en: 'elite individual quality' }
    },
    {
      match: 'Frankreich vs Norwegen',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'überlegen', en: 'overall superiority' }
    },
    {
      match: 'Frankreich vs Play-off 2',
      score: '3:0',
      home: 85,
      draw: 10,
      away: 5,
      reason: { de: 'klar besser', en: 'clearly stronger' }
    }
  ],
  England: [
    {
      match: 'England vs Kroatien',
      score: '2:1',
      home: 60,
      draw: 25,
      away: 15,
      reason: { de: 'Tempo', en: 'tempo advantage' }
    },
    {
      match: 'England vs Panama',
      score: '3:0',
      home: 85,
      draw: 10,
      away: 5,
      reason: { de: 'klar überlegen', en: 'clear favorite' }
    },
    {
      match: 'England vs Ghana',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'Struktur', en: 'better structure' }
    }
  ],
  Argentinien: [
    {
      match: 'Argentinien vs Algerien',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'mehr Qualität', en: 'higher quality level' }
    },
    {
      match: 'Argentinien vs Österreich',
      score: '2:1',
      home: 60,
      draw: 25,
      away: 15,
      reason: { de: 'effizienter', en: 'more efficient in attack' }
    },
    {
      match: 'Argentinien vs Jordanien',
      score: '3:0',
      home: 85,
      draw: 10,
      away: 5,
      reason: { de: 'klar überlegen', en: 'clear superiority' }
    }
  ],
  Spanien: [
    {
      match: 'Spanien vs Kap Verde',
      score: '2:0',
      home: 75,
      draw: 15,
      away: 10,
      reason: { de: 'dominant', en: 'dominant style of play' }
    },
    {
      match: 'Spanien vs Uruguay',
      score: '2:1',
      home: 55,
      draw: 25,
      away: 20,
      reason: { de: 'technisch stärker', en: 'technically stronger' }
    },
    {
      match: 'Spanien vs Saudi-Arabien',
      score: '3:0',
      home: 80,
      draw: 15,
      away: 5,
      reason: { de: 'klar überlegen', en: 'heavy favorite' }
    }
  ],
  Portugal: [
    {
      match: 'Portugal vs Kolumbien',
      score: '2:1',
      home: 55,
      draw: 25,
      away: 20,
      reason: { de: 'mehr Qualität', en: 'more quality in decisive areas' }
    },
    {
      match: 'Portugal vs Usbekistan',
      score: '3:0',
      home: 80,
      draw: 15,
      away: 5,
      reason: { de: 'klar überlegen', en: 'clear superiority' }
    },
    {
      match: 'Portugal vs Play-off 1',
      score: '2:0',
      home: 75,
      draw: 15,
      away: 10,
      reason: { de: 'besser', en: 'better overall squad' }
    }
  ],
  USA: [
    {
      match: 'USA vs Paraguay',
      score: '2:1',
      home: 55,
      draw: 25,
      away: 20,
      reason: { de: 'Tempo Vorteil', en: 'pace advantage' }
    },
    {
      match: 'USA vs Australien',
      score: '2:0',
      home: 65,
      draw: 20,
      away: 15,
      reason: { de: 'bessere Offensive', en: 'stronger attacking output' }
    },
    {
      match: 'USA vs Play-off C',
      score: '3:0',
      home: 80,
      draw: 15,
      away: 5,
      reason: { de: 'klar überlegen', en: 'heavy favorite' }
    }
  ],
  Niederlande: [
    {
      match: 'Niederlande vs Japan',
      score: '2:1',
      home: 55,
      draw: 25,
      away: 20,
      reason: { de: 'mehr Effizienz', en: 'more efficiency in front of goal' }
    },
    {
      match: 'Niederlande vs Tunesien',
      score: '2:0',
      home: 65,
      draw: 20,
      away: 15,
      reason: { de: 'mehr Qualität', en: 'higher quality level' }
    },
    {
      match: 'Niederlande vs Play-off B',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'klar besser', en: 'clearly stronger' }
    }
  ],
  Belgien: [
    {
      match: 'Belgien vs Ägypten',
      score: '2:1',
      home: 60,
      draw: 25,
      away: 15,
      reason: { de: 'Offensiv stärker', en: 'more dangerous in attack' }
    },
    {
      match: 'Belgien vs Iran',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'klar überlegen', en: 'clear favorite' }
    },
    {
      match: 'Belgien vs Neuseeland',
      score: '3:0',
      home: 85,
      draw: 10,
      away: 5,
      reason: { de: 'Klassenunterschied', en: 'major quality gap' }
    }
  ],
  Mexiko: [
    {
      match: 'Mexiko vs Südafrika',
      score: '2:1',
      home: 55,
      draw: 25,
      away: 20,
      reason: { de: 'mehr Erfahrung', en: 'more tournament experience' }
    },
    {
      match: 'Mexiko vs Südkorea',
      score: '1:1',
      home: 40,
      draw: 35,
      away: 25,
      reason: { de: 'ausgeglichen', en: 'very balanced matchup' }
    },
    {
      match: 'Mexiko vs Play-off D',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'klar überlegen', en: 'clear superiority' }
    }
  ],
  Japan: [
    {
      match: 'Japan vs Niederlande',
      score: '1:2',
      home: 20,
      draw: 25,
      away: 55,
      reason: { de: 'unterlegen', en: 'slightly outmatched' }
    },
    {
      match: 'Japan vs Tunesien',
      score: '1:1',
      home: 35,
      draw: 40,
      away: 25,
      reason: { de: 'ausgeglichen', en: 'balanced game profile' }
    },
    {
      match: 'Japan vs Play-off B',
      score: '2:0',
      home: 65,
      draw: 20,
      away: 15,
      reason: { de: 'überlegen', en: 'stronger overall team' }
    }
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
  { team: 'Brasilien', chance: 24 },
  { team: 'Frankreich', chance: 19 },
  { team: 'Deutschland', chance: 16 },
  { team: 'Argentinien', chance: 14 }
];

const ui = {
  de: {
    brandTitle: 'WM KI Predictor',
    brandSubtitle: 'Professionelle Turnier-Prognosen',
    navFavorites: 'Favoriten',
    navTeams: 'Teams',
    navMatches: 'Match Center',
    heroKicker: 'WM 2026 Prognoseplattform',
    heroTitle: 'World Cup 2026 Prognosen mit modernem Premium-Look.',
    heroText:
      'Interaktive Fußball-Prognosen mit Team-Rankings, Ergebnis-Tipps, Wahrscheinlichkeiten und klaren Match-Analysen für die WM 2026.',
    heroPrimary: 'Zum Match Center',
    heroSecondary: 'Favoriten ansehen',
    metricTeams: 'Teams',
    metricPredictions: 'Prognosen',
    metricPreview: 'Preview',
    topPrediction: 'Top-Prognose',
    topPredictionText:
      'Brasilien gehört aktuell zu den stärksten Titelfavoriten und startet mit einer sehr klaren Projektion in diese Vorschau.',
    platformFocus: 'Plattform-Fokus',
    platformFocusTitle: 'Klare WM-Prognosen statt unübersichtlicher Daten',
    platformFocusText:
      'Die Seite bündelt Team-Auswahl, Spielprognosen, Wahrscheinlichkeiten und kurze Analysen in einer kompakten Oberfläche.',
    topTeam: 'Top-Team',
    nextBuild: 'Nächster Ausbau',
    nextBuildTitle: 'Mehr Teams, KO-Runde, Live-Daten',
    nextBuildText:
      'Die Struktur ist bereit für größere Inhalte, spätere Datenquellen und zusätzliche Reichweiten-Features.',
    rankingLabel: 'Favoriten-Ranking',
    rankingTitle: 'Die stärksten Titelkandidaten',
    previewChip: 'Preview 2026',
    titleChance: 'Titelchance',
    teamsLabel: 'Teams',
    teamsTitle: 'Team auswählen',
    visible: 'sichtbar',
    searchPlaceholder: 'Nach Team suchen',
    matchesLabel: 'Match Center',
    matchesTitle: 'Prognosen für',
    games: 'Spiele',
    selectedTeam: 'Ausgewähltes Team',
    selectedTeamText:
      'Öffne ein Spiel, um Ergebnis-Tipp, Wahrscheinlichkeiten und die Begründung zu sehen.',
    sidebarTitle: 'Was diese Ansicht zeigt',
    sidebar1: 'Prognostiziertes Ergebnis',
    sidebar2: 'Verteilung der Wahrscheinlichkeiten',
    sidebar3: 'Kurze Begründung zur Einschätzung',
    groupGame: 'Gruppenspiel',
    openAnalysis: 'Analyse öffnen',
    closeAnalysis: 'Weniger anzeigen',
    probabilities: 'Wahrscheinlichkeiten',
    hiddenScore: '– : –',
    reasoningTitle: 'Begründung',
    reasoningText: 'Die aktuelle Einschätzung spricht für dieses Ergebnis wegen',
    draw: 'Unentschieden',
    faq: 'FAQ',
    faq1Title: 'Wie entstehen die Prognosen?',
    faq1Text:
      'Durch eine vereinfachte datenbasierte Einschätzung aus Teamstärke, Qualität und Wahrscheinlichkeiten.',
    note: 'Hinweis',
    faq2Title: 'Sind das Live-Daten?',
    faq2Text:
      'Aktuell ist die Seite eine hochwertige Vorschau mit vorbereiteten Projektionen und klarer Produktstruktur.',
    roadmap: 'Roadmap',
    faq3Title: 'Was kommt als Nächstes?',
    faq3Text:
      'Mehr Teams, komplette Gruppen, KO-Runden, Teamseiten, SEO-Ausbau und später dynamische Datenquellen.',
    footerText:
      'Moderne Vorschau-Plattform für Spielprognosen, Favoriten und datenbasierte Turnier-Einschätzungen.',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    clearFavorite: 'Klarer Favorit',
    closeGame: 'Enges Spiel',
    upsetPotential: 'Überraschungspotenzial',
    balanced: 'Ausgeglichen'
  },
  en: {
    brandTitle: 'World Cup AI Predictor',
    brandSubtitle: 'Professional tournament forecasts',
    navFavorites: 'Favorites',
    navTeams: 'Teams',
    navMatches: 'Match Center',
    heroKicker: 'World Cup 2026 prediction platform',
    heroTitle: 'World Cup 2026 predictions with a premium modern product feel.',
    heroText:
      'Interactive football predictions with team rankings, match forecasts, win probabilities and concise World Cup 2026 analysis.',
    heroPrimary: 'Open Match Center',
    heroSecondary: 'View Favorites',
    metricTeams: 'Teams',
    metricPredictions: 'Predictions',
    metricPreview: 'Preview',
    topPrediction: 'Top prediction',
    topPredictionText:
      'Brazil currently projects as one of the strongest title contenders and opens this preview with a very clear forecast.',
    platformFocus: 'Platform focus',
    platformFocusTitle: 'Clear World Cup predictions instead of messy data',
    platformFocusText:
      'The platform combines team selection, match forecasts, probabilities and short analysis in one clean interface.',
    topTeam: 'Top team',
    nextBuild: 'Next upgrade',
    nextBuildTitle: 'More teams, knockout stage, live data',
    nextBuildText:
      'The structure is ready for larger content, future data sources and stronger growth features.',
    rankingLabel: 'Favorites ranking',
    rankingTitle: 'The strongest title contenders',
    previewChip: 'Preview 2026',
    titleChance: 'Title chance',
    teamsLabel: 'Teams',
    teamsTitle: 'Select a team',
    visible: 'visible',
    searchPlaceholder: 'Search for a team',
    matchesLabel: 'Match Center',
    matchesTitle: 'Predictions for',
    games: 'games',
    selectedTeam: 'Selected team',
    selectedTeamText:
      'Open a match to see the score prediction, probability split and reasoning behind the forecast.',
    sidebarTitle: 'What this view shows',
    sidebar1: 'Predicted scoreline',
    sidebar2: 'Probability distribution',
    sidebar3: 'Short reasoning behind the forecast',
    groupGame: 'Group stage match',
    openAnalysis: 'Open analysis',
    closeAnalysis: 'Show less',
    probabilities: 'Probabilities',
    hiddenScore: '– : –',
    reasoningTitle: 'Reasoning',
    reasoningText: 'The current forecast points to this result because of',
    draw: 'Draw',
    faq: 'FAQ',
    faq1Title: 'How are the predictions created?',
    faq1Text:
      'They are based on a simplified data-driven view of team strength, quality and probability distribution.',
    note: 'Note',
    faq2Title: 'Is this live data?',
    faq2Text:
      'The current version is a high-quality preview with prepared projections and a strong product-style interface.',
    roadmap: 'Roadmap',
    faq3Title: 'What comes next?',
    faq3Text:
      'More teams, complete groups, knockout rounds, team pages, better SEO and dynamic data sources later on.',
    footerText:
      'Modern preview platform for match forecasts, favorites and data-based World Cup tournament insights.',
    impressum: 'Legal Notice',
    datenschutz: 'Privacy',
    clearFavorite: 'Clear favorite',
    closeGame: 'Tight matchup',
    upsetPotential: 'Upset potential',
    balanced: 'Balanced'
  }
} satisfies Record<Lang, Record<string, string>>;

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function splitMatch(match: string) {
  const [home, away] = match.split(' vs ');
  return { home, away };
}

function getBadge(prediction: MatchPrediction, lang: Lang) {
  const maxValue = Math.max(prediction.home, prediction.draw, prediction.away);
  if (prediction.home === maxValue && prediction.home >= 75) return ui[lang].clearFavorite;
  if (prediction.draw === maxValue) return ui[lang].closeGame;
  if (prediction.away === maxValue && prediction.away >= 50) return ui[lang].upsetPotential;
  return ui[lang].balanced;
}

function StatBar({
  label,
  value
}: {
  label: string;
  value: number;
}) {
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
  onToggle,
  lang
}: {
  prediction: MatchPrediction;
  isOpen: boolean;
  onToggle: () => void;
  lang: Lang;
}) {
  const t = ui[lang];
  const parts = splitMatch(prediction.match);

  return (
    <article className="match-card-v2">
      <div className="match-card-top">
        <div>
          <p className="section-label">{t.groupGame}</p>
          <h3 className="match-card-title">
            <span>{flags[parts.home] || '⚽'} {parts.home}</span>
            <span className="match-card-vs">vs</span>
            <span>{flags[parts.away] || '⚽'} {parts.away}</span>
          </h3>
        </div>

        <div className="match-card-score">
          {isOpen ? prediction.score : t.hiddenScore}
        </div>
      </div>

      <div className="match-card-meta">
        <span className="status-badge">{getBadge(prediction, lang)}</span>
        <span className="analysis-tag">
          {lang === 'de' ? 'Analyse' : 'Analysis'}: {prediction.reason[lang]}
        </span>
      </div>

      <button className="cta-button secondary" onClick={onToggle}>
        {isOpen ? t.closeAnalysis : t.openAnalysis}
      </button>

      {isOpen && (
        <div className="match-card-panel">
          <p className="section-label">{t.probabilities}</p>
          <p className="result-number">{prediction.score}</p>

          <div className="stat-bars">
            <StatBar label={`${flags[parts.home] || '⚽'} ${parts.home}`} value={prediction.home} />
            <StatBar label={t.draw} value={prediction.draw} />
            <StatBar label={`${flags[parts.away] || '⚽'} ${parts.away}`} value={prediction.away} />
          </div>

          <div className="panel-note">
            <strong>{t.reasoningTitle}</strong>
            <p>{t.reasoningText} {prediction.reason[lang]}.</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.hash || '#/');
  const [lang, setLang] = useState<Lang>(() => {
    const saved = window.localStorage.getItem('lang');
    return saved === 'de' || saved === 'en' ? saved : 'en';
  });
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

  useEffect(() => {
    window.localStorage.setItem('lang', lang);

    const title =
      lang === 'de'
        ? 'WM 2026 Prognosen | World Cup AI Predictor'
        : 'World Cup 2026 Predictions | World Cup AI Predictor';
    document.title = title;

    const description =
      lang === 'de'
        ? 'WM 2026 Prognosen mit KI: Match-Vorhersagen, Wahrscheinlichkeiten, Favoriten-Ranking und Team-Analysen.'
        : 'World Cup 2026 predictions with AI: match forecasts, probabilities, favorites ranking and team analysis.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    document.documentElement.lang = lang;
  }, [lang]);

  const filteredTeams = useMemo(() => {
    if (!query.trim()) return allTeams;
    const normalizedQuery = normalize(query);
    return allTeams.filter((entry) => normalize(entry).includes(normalizedQuery));
  }, [query]);

  const currentMatches = data[team] ?? [];
  const topMatch = data['Brasilien'][0];
  const t = ui[lang];

  if (path === '#/impressum') {
    return <Impressum lang={lang} onBack={() => { window.location.hash = '/'; }} />;
  }

  if (path === '#/datenschutz') {
    return <Datenschutz lang={lang} onBack={() => { window.location.hash = '/'; }} />;
  }

  return (
    <div className="site-shell">
      <div className="site-glow site-glow-left" />
      <div className="site-glow site-glow-right" />

      <header className="topbar-wrap">
        <div className="container topbar">
          <div className="brand">
            <div className="brand-mark">WC</div>
            <div>
              <strong>{t.brandTitle}</strong>
              <p>{t.brandSubtitle}</p>
            </div>
          </div>

          <nav className="topnav">
            <button onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.navFavorites}
            </button>
            <button onClick={() => document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.navTeams}
            </button>
            <button onClick={() => document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.navMatches}
            </button>
          </nav>

          <div className="lang-switch">
            <button
              className={lang === 'de' ? 'active' : ''}
              onClick={() => setLang('de')}
              type="button"
            >
              DE
            </button>
            <button
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
              type="button"
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main className="container main-layout">
        <section className="hero-v2">
          <div className="hero-panel">
            <p className="hero-kicker">{t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-description">{t.heroText}</p>

            <div className="hero-actions">
              <button
                className="cta-button"
                onClick={() => document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.heroPrimary}
              </button>

              <button
                className="ghost-button"
                onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.heroSecondary}
              </button>
            </div>

            <div className="hero-metrics">
              <div className="metric-card">
                <strong>{allTeams.length}</strong>
                <span>{t.metricTeams}</span>
              </div>
              <div className="metric-card">
                <strong>{Object.values(data).flat().length}</strong>
                <span>{t.metricPredictions}</span>
              </div>
              <div className="metric-card">
                <strong>2026</strong>
                <span>{t.metricPreview}</span>
              </div>
            </div>
          </div>

          <aside className="hero-highlight">
            <p className="section-label">{t.topPrediction}</p>
            <h2>{topMatch.match}</h2>
            <div className="hero-highlight-score">{topMatch.score}</div>
            <p className="hero-highlight-text">{t.topPredictionText}</p>

            <div className="highlight-bars">
              <StatBar label="🇧🇷 Brasilien" value={topMatch.home} />
              <StatBar label={t.draw} value={topMatch.draw} />
              <StatBar label="🇭🇹 Haiti" value={topMatch.away} />
            </div>
          </aside>
        </section>

        <section className="overview-grid">
          <article className="overview-card dark">
            <p className="section-label">{t.platformFocus}</p>
            <h3>{t.platformFocusTitle}</h3>
            <p>{t.platformFocusText}</p>
          </article>

          <article className="overview-card">
            <p className="section-label">{t.topTeam}</p>
            <h3>🇧🇷 Brasilien</h3>
            <p>
              {lang === 'de'
                ? 'Starker Kader, Tiefe auf mehreren Positionen und hohe Turnierqualität.'
                : 'Strong squad depth, quality across the pitch and high tournament upside.'}
            </p>
          </article>

          <article className="overview-card">
            <p className="section-label">{t.nextBuild}</p>
            <h3>{t.nextBuildTitle}</h3>
            <p>{t.nextBuildText}</p>
          </article>
        </section>

        <section id="ranking" className="section-block">
          <div className="section-header-v2">
            <div>
              <p className="section-label">{t.rankingLabel}</p>
              <h2>{t.rankingTitle}</h2>
            </div>
            <span className="header-chip">{t.previewChip}</span>
          </div>

          <div className="ranking-list">
            {ranking.map((entry, index) => (
              <article key={entry.team} className="ranking-item">
                <div className="ranking-number">0{index + 1}</div>

                <div className="ranking-main">
                  <h3>{flags[entry.team]} {entry.team}</h3>
                  <p>
                    {lang === 'de'
                      ? `${entry.team} gehört aktuell zu den stärksten Favoriten in dieser Vorschau.`
                      : `${entry.team} currently ranks among the strongest title favorites in this preview.`}
                  </p>
                </div>

                <div className="ranking-side">
                  <strong>{entry.chance}%</strong>
                  <span>{t.titleChance}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="teams" className="section-block">
          <div className="section-header-v2">
            <div>
              <p className="section-label">{t.teamsLabel}</p>
              <h2>{t.teamsTitle}</h2>
            </div>
            <span className="header-chip">{filteredTeams.length} {t.visible}</span>
          </div>

          <div className="team-explorer">
            <div className="team-search-box">
              <span>🔎</span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
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
                  type="button"
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
                  type="button"
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
              <p className="section-label">{t.matchesLabel}</p>
              <h2>{t.matchesTitle} {flags[team] || '⚽'} {team}</h2>
            </div>
            <span className="header-chip">{currentMatches.length} {t.games}</span>
          </div>

          <div className="match-layout">
            <aside className="match-sidebar">
              <p className="section-label">{t.selectedTeam}</p>
              <h3>{flags[team] || '⚽'} {team}</h3>
              <p>{t.selectedTeamText}</p>

              <div className="sidebar-box">
                <strong>{t.sidebarTitle}</strong>
                <ul>
                  <li>{t.sidebar1}</li>
                  <li>{t.sidebar2}</li>
                  <li>{t.sidebar3}</li>
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
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="faq-strip">
          <article className="faq-card">
            <p className="section-label">{t.faq}</p>
            <h3>{t.faq1Title}</h3>
            <p>{t.faq1Text}</p>
          </article>

          <article className="faq-card">
            <p className="section-label">{t.note}</p>
            <h3>{t.faq2Title}</h3>
            <p>{t.faq2Text}</p>
          </article>

          <article className="faq-card">
            <p className="section-label">{t.roadmap}</p>
            <h3>{t.faq3Title}</h3>
            <p>{t.faq3Text}</p>
          </article>
        </section>

        <footer className="footer-v2">
          <div>
            <strong>{t.brandTitle}</strong>
            <p>{t.footerText}</p>
          </div>

          <div className="footer-v2-links">
            <button type="button" onClick={() => { window.location.hash = '/impressum'; }}>
              {t.impressum}
            </button>
            <button type="button" onClick={() => { window.location.hash = '/datenschutz'; }}>
              {t.datenschutz}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}