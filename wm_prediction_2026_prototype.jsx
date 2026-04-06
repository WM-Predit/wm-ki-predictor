import { useMemo, useState } from "react";
import { Trophy, Search, Star, ChevronRight, Sparkles, Flame } from "lucide-react";

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
    { match: "Deutschland vs Curaçao", score: "3–0", home: 85, draw: 10, away: 5, reason: "klare Überlegenheit" },
    { match: "Deutschland vs Elfenbeinküste", score: "2–1", home: 60, draw: 25, away: 15, reason: "individuell stärker" },
    { match: "Deutschland vs Ecuador", score: "2–0", home: 68, draw: 20, away: 12, reason: "bessere Qualität" },
  ],
  Brasilien: [
    { match: "Brasilien vs Haiti", score: "3–0", home: 85, draw: 10, away: 5, reason: "Klassenunterschied" },
    { match: "Brasilien vs Schottland", score: "2–0", home: 70, draw: 20, away: 10, reason: "mehr Klasse" },
    { match: "Brasilien vs Marokko", score: "2–1", home: 60, draw: 25, away: 15, reason: "effizienter" },
  ],
  Frankreich: [
    { match: "Frankreich vs Senegal", score: "2–1", home: 60, draw: 25, away: 15, reason: "individuelle Klasse" },
    { match: "Frankreich vs Norwegen", score: "2–0", home: 70, draw: 20, away: 10, reason: "überlegen" },
    { match: "Frankreich vs Play-off 2", score: "3–0", home: 85, draw: 10, away: 5, reason: "klar besser" },
  ],
  England: [
    { match: "England vs Kroatien", score: "2–1", home: 60, draw: 25, away: 15, reason: "Tempo" },
    { match: "England vs Panama", score: "3–0", home: 85, draw: 10, away: 5, reason: "klar überlegen" },
    { match: "England vs Ghana", score: "2–0", home: 70, draw: 20, away: 10, reason: "Struktur" },
  ],
  Argentinien: [
    { match: "Argentinien vs Algerien", score: "2–0", home: 70, draw: 20, away: 10, reason: "mehr Qualität" },
    { match: "Argentinien vs Österreich", score: "2–1", home: 60, draw: 25, away: 15, reason: "effizienter" },
    { match: "Argentinien vs Jordanien", score: "3–0", home: 85, draw: 10, away: 5, reason: "klar überlegen" },
  ],
  Spanien: [
    { match: "Spanien vs Kap Verde", score: "2–0", home: 75, draw: 15, away: 10, reason: "dominant" },
    { match: "Spanien vs Uruguay", score: "2–1", home: 55, draw: 25, away: 20, reason: "technisch stärker" },
    { match: "Spanien vs Saudi-Arabien", score: "3–0", home: 80, draw: 15, away: 5, reason: "klar überlegen" },
  ],
  Portugal: [
    { match: "Portugal vs Kolumbien", score: "2–1", home: 55, draw: 25, away: 20, reason: "mehr Qualität" },
    { match: "Portugal vs Usbekistan", score: "3–0", home: 80, draw: 15, away: 5, reason: "klar überlegen" },
    { match: "Portugal vs Play-off 1", score: "2–0", home: 75, draw: 15, away: 10, reason: "besser" },
  ],
  USA: [
    { match: "USA vs Paraguay", score: "2–1", home: 55, draw: 25, away: 20, reason: "Tempo Vorteil" },
    { match: "USA vs Australien", score: "2–0", home: 65, draw: 20, away: 15, reason: "bessere Offensive" },
    { match: "USA vs Play-off C", score: "3–0", home: 80, draw: 15, away: 5, reason: "klar überlegen" },
  ],
  Niederlande: [
    { match: "Niederlande vs Japan", score: "2–1", home: 55, draw: 25, away: 20, reason: "mehr Effizienz" },
    { match: "Niederlande vs Tunesien", score: "2–0", home: 65, draw: 20, away: 15, reason: "mehr Qualität" },
    { match: "Niederlande vs Play-off B", score: "2–0", home: 70, draw: 20, away: 10, reason: "klar besser" },
  ],
  Belgien: [
    { match: "Belgien vs Ägypten", score: "2–1", home: 60, draw: 25, away: 15, reason: "Offensiv stärker" },
    { match: "Belgien vs Iran", score: "2–0", home: 70, draw: 20, away: 10, reason: "klar überlegen" },
    { match: "Belgien vs Neuseeland", score: "3–0", home: 85, draw: 10, away: 5, reason: "Klassenunterschied" },
  ],
  Mexiko: [
    { match: "Mexiko vs Südafrika", score: "2–1", home: 55, draw: 25, away: 20, reason: "mehr Erfahrung" },
    { match: "Mexiko vs Südkorea", score: "1–1", home: 40, draw: 35, away: 25, reason: "ausgeglichen" },
    { match: "Mexiko vs Play-off D", score: "2–0", home: 70, draw: 20, away: 10, reason: "klar überlegen" },
  ],
  Japan: [
    { match: "Japan vs Niederlande", score: "1–2", home: 20, draw: 25, away: 55, reason: "unterlegen" },
    { match: "Japan vs Tunesien", score: "1–1", home: 35, draw: 40, away: 25, reason: "ausgeglichen" },
    { match: "Japan vs Play-off B", score: "2–0", home: 65, draw: 20, away: 15, reason: "überlegen" },
  ],
};

const flags: Record<string, string> = {
  Deutschland: "🇩🇪",
  Brasilien: "🇧🇷",
  Frankreich: "🇫🇷",
  England: "🏴",
  Argentinien: "🇦🇷",
  Spanien: "🇪🇸",
  Portugal: "🇵🇹",
  USA: "🇺🇸",
  Niederlande: "🇳🇱",
  Belgien: "🇧🇪",
  Mexiko: "🇲🇽",
  Japan: "🇯🇵",
  Curaçao: "🇨🇼",
  Elfenbeinküste: "🇨🇮",
  Ecuador: "🇪🇨",
  Haiti: "🇭🇹",
  Schottland: "🏴",
  Marokko: "🇲🇦",
  Senegal: "🇸🇳",
  Norwegen: "🇳🇴",
  Kroatien: "🇭🇷",
  Panama: "🇵🇦",
  Ghana: "🇬🇭",
  Algerien: "🇩🇿",
  Österreich: "🇦🇹",
  Jordanien: "🇯🇴",
  "Kap Verde": "🇨🇻",
  Uruguay: "🇺🇾",
  "Saudi-Arabien": "🇸🇦",
  Kolumbien: "🇨🇴",
  Usbekistan: "🇺🇿",
  Paraguay: "🇵🇾",
  Australien: "🇦🇺",
  Tunesien: "🇹🇳",
  Ägypten: "🇪🇬",
  Iran: "🇮🇷",
  Neuseeland: "🇳🇿",
  Südafrika: "🇿🇦",
  Südkorea: "🇰🇷",
};

const featuredTeams = [
  "Deutschland",
  "Brasilien",
  "Frankreich",
  "England",
  "Argentinien",
  "Spanien",
];

const allTeams = Object.keys(data).sort((a, b) => a.localeCompare(b));

function splitMatch(match: string) {
  const [home, away] = match.split(" vs ");
  return { home, away };
}

type BarProps = {
  label: string;
  value: number;
};

function Bar({ label, value }: BarProps) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <strong className="text-base text-white">{value}%</strong>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-white to-white/70 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("Deutschland");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return featuredTeams;
    return allTeams.filter((t) => t.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const favorite = "Brasilien";

  return (
    <div className="min-h-screen text-white relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2')",
        }}
      />
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />

      <section className="relative z-10 overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,17,29,0.72)_0%,rgba(10,20,36,0.82)_100%)]">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
                <Trophy className="h-4 w-4" />
                WM KI Predictor 2026
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Wer gewinnt die WM 2026?
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                Starte jetzt deine KI-Prognose für jedes Spiel. Wähle dein Team, entdecke die Gruppenspiele und öffne exklusive Vorhersagen mit Ergebnis, Wahrscheinlichkeiten und Analyse.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">🏆 48 Teams</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">📊 12 Gruppen</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">⚽ 3 Spiele pro Team</div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1726] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-white/60">Suche dein Team</p>
                  <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                    Live Preview
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                  <Search className="h-5 w-5 text-white/40" />
                  <input
                    placeholder="z. B. Frankreich oder Spanien"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent text-base outline-none placeholder:text-white/35"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {filtered.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTeam(t);
                        setOpen(null);
                      }}
                      className={`rounded-2xl border px-4 py-3 text-left transition duration-200 ${team === t ? "border-white/30 bg-white text-black shadow-lg" : "border-white/10 bg-white/5 text-white hover:bg-white/10"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 font-medium">
                          <span>{flags[t] || "⚽"}</span>
                          <span>{t}</span>
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
                  <p className="text-sm text-white/55">Beliebteste Auswahl</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-3xl">{flags[team] || "⚽"}</span>
                    <div>
                      <h2 className="text-3xl font-bold">{team}</h2>
                      <p className="text-sm text-white/65">Tippe auf ein Spiel und öffne deine Vorhersage.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white/85">
              <Star className="h-5 w-5" />
              <span className="text-sm">Favorit der WM</span>
            </div>
            <p className="mt-4 text-3xl font-black">{flags[favorite]} {favorite}</p>
            <p className="mt-2 text-sm leading-6 text-white/65">Starker Kader, hohe Qualität in der Breite und klare Vorteile in den Gruppenspielen.</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white/85">
              <Flame className="h-5 w-5" />
              <span className="text-sm">Beliebte Teams</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredTeams.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTeam(t);
                    setOpen(null);
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                >
                  {flags[t] || "⚽"} {t}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white/85">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm">So funktioniert's</span>
            </div>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>1. Team auswählen</p>
              <p>2. Spiel öffnen</p>
              <p>3. KI-Vorhersage sehen</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">Match Center</p>
            <h3 className="mt-2 text-3xl font-bold">Deine Gruppenspiele</h3>
          </div>
          <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 md:block">
            {data[team]?.length || 0} Spiele verfügbar
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          {data[team]?.map((m) => {
            const parts = splitMatch(m.match);
            const isOpen = open === m.match;
            return (
              <div key={m.match} className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/45">Gruppenspiel</p>
                    <h4 className="mt-2 text-2xl font-bold leading-tight">
                      {flags[parts.home] || "⚽"} {parts.home} <span className="text-white/45">vs</span> {flags[parts.away] || "⚽"} {parts.away}
                    </h4>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/70">
                    {m.score}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                  KI-Hinweis: {m.reason}
                </div>

                <button
                  onClick={() => setOpen(isOpen ? null : m.match)}
                  className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:scale-[1.01]"
                >
                  {isOpen ? "Vorhersage schließen" : "Starte deine Vorhersage"}
                </button>

                {isOpen && (
                  <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-5">
                    <p className="text-sm text-white/50">Vorhergesagtes Ergebnis</p>
                    <p className="mt-1 text-5xl font-black tracking-tight">{m.score}</p>

                    <div className="mt-5 space-y-1">
                      <Bar label={`${flags[parts.home] || "⚽"} ${parts.home}`} value={m.home} />
                      <Bar label="🤝 Unentschieden" value={m.draw} />
                      <Bar label={`${flags[parts.away] || "⚽"} ${parts.away}`} value={m.away} />
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-base leading-7 text-white/75">
                      <span className="font-semibold text-white">Warum diese Prognose?</span>
                      <br />
                      Die Einschätzung spricht für dieses Ergebnis wegen <span className="text-white">{m.reason}</span>.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
