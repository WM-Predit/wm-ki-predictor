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

type GroupEntry = {
  team: string;
  pts: number;
  gf: number;
  ga: number;
  advance: number;
};

type GroupData = {
  group: string;
  teams: string[];
  table: GroupEntry[];
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
      match: 'Frankreich vs Tunesien',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
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
      match: 'Argentinien vs Saudi-Arabien',
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
      match: 'Portugal vs Paraguay',
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
      match: 'USA vs Tunesien',
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
      match: 'Niederlande vs Norwegen',
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
      match: 'Mexiko vs Senegal',
      score: '1:1',
      home: 30,
      draw: 40,
      away: 30,
      reason: { de: 'enges Spiel', en: 'tight matchup' }
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
      match: 'Japan vs Senegal',
      score: '1:1',
      home: 30,
      draw: 40,
      away: 30,
      reason: { de: 'sehr offen', en: 'very open matchup' }
    }
  ],
  Senegal: [
    {
      match: 'Senegal vs Deutschland',
      score: '1:2',
      home: 15,
      draw: 25,
      away: 60,
      reason: { de: 'Deutschland individueller stärker', en: 'Germany has stronger individual quality' }
    },
    {
      match: 'Senegal vs Japan',
      score: '1:1',
      home: 30,
      draw: 40,
      away: 30,
      reason: { de: 'sehr ausgeglichen', en: 'very balanced matchup' }
    },
    {
      match: 'Senegal vs Mexiko',
      score: '1:1',
      home: 30,
      draw: 40,
      away: 30,
      reason: { de: 'ähnliches Niveau', en: 'similar overall level' }
    }
  ],
  Uruguay: [
    {
      match: 'Uruguay vs Brasilien',
      score: '1:2',
      home: 20,
      draw: 25,
      away: 55,
      reason: { de: 'Brasilien offensiv stärker', en: 'Brazil is stronger in attack' }
    },
    {
      match: 'Uruguay vs Iran',
      score: '2:0',
      home: 65,
      draw: 20,
      away: 15,
      reason: { de: 'mehr Qualität', en: 'higher overall quality' }
    },
    {
      match: 'Uruguay vs Panama',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'klar überlegen', en: 'clear favorite' }
    }
  ],
  Panama: [
    {
      match: 'Panama vs Brasilien',
      score: '0:3',
      home: 5,
      draw: 10,
      away: 85,
      reason: { de: 'deutlicher Klassenunterschied', en: 'clear quality gap' }
    },
    {
      match: 'Panama vs Uruguay',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Uruguay klar stärker', en: 'Uruguay is clearly stronger' }
    },
    {
      match: 'Panama vs Iran',
      score: '1:1',
      home: 25,
      draw: 40,
      away: 35,
      reason: { de: 'leichtes Plus für Iran', en: 'slight edge for Iran' }
    }
  ],
  Iran: [
    {
      match: 'Iran vs Brasilien',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Brasilien klar überlegen', en: 'Brazil is clearly stronger' }
    },
    {
      match: 'Iran vs Uruguay',
      score: '0:2',
      home: 15,
      draw: 20,
      away: 65,
      reason: { de: 'Uruguay mit mehr Klasse', en: 'Uruguay has more quality' }
    },
    {
      match: 'Iran vs Panama',
      score: '1:1',
      home: 35,
      draw: 40,
      away: 25,
      reason: { de: 'enge Partie', en: 'tight matchup' }
    }
  ],
  Australien: [
    {
      match: 'Australien vs Frankreich',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Frankreich klar stärker', en: 'France is clearly stronger' }
    },
    {
      match: 'Australien vs USA',
      score: '0:2',
      home: 15,
      draw: 20,
      away: 65,
      reason: { de: 'USA offensiv besser', en: 'USA has stronger attacking quality' }
    },
    {
      match: 'Australien vs Tunesien',
      score: '1:1',
      home: 30,
      draw: 40,
      away: 30,
      reason: { de: 'sehr ausgeglichen', en: 'very balanced matchup' }
    }
  ],
  Tunesien: [
    {
      match: 'Tunesien vs Frankreich',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Frankreich überlegen', en: 'France has the stronger squad' }
    },
    {
      match: 'Tunesien vs USA',
      score: '0:2',
      home: 15,
      draw: 20,
      away: 65,
      reason: { de: 'USA mit mehr Tempo', en: 'USA has more pace' }
    },
    {
      match: 'Tunesien vs Australien',
      score: '1:1',
      home: 30,
      draw: 40,
      away: 30,
      reason: { de: 'ausgeglichen', en: 'balanced matchup' }
    }
  ],
  Kroatien: [
    {
      match: 'Kroatien vs England',
      score: '1:2',
      home: 15,
      draw: 25,
      away: 60,
      reason: { de: 'England mit mehr Tempo', en: 'England has more pace' }
    },
    {
      match: 'Kroatien vs Ghana',
      score: '2:1',
      home: 55,
      draw: 25,
      away: 20,
      reason: { de: 'mehr Erfahrung', en: 'more tournament experience' }
    },
    {
      match: 'Kroatien vs Südkorea',
      score: '1:1',
      home: 35,
      draw: 35,
      away: 30,
      reason: { de: 'enges Spiel', en: 'close matchup' }
    }
  ],
  Ghana: [
    {
      match: 'Ghana vs England',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'England klar besser', en: 'England is clearly stronger' }
    },
    {
      match: 'Ghana vs Kroatien',
      score: '1:2',
      home: 20,
      draw: 25,
      away: 55,
      reason: { de: 'Kroatien etwas stärker', en: 'Croatia has a slight edge' }
    },
    {
      match: 'Ghana vs Südkorea',
      score: '1:1',
      home: 30,
      draw: 40,
      away: 30,
      reason: { de: 'sehr offen', en: 'very open matchup' }
    }
  ],
  Südkorea: [
    {
      match: 'Südkorea vs England',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'England stärker besetzt', en: 'England has the stronger squad' }
    },
    {
      match: 'Südkorea vs Kroatien',
      score: '1:1',
      home: 30,
      draw: 35,
      away: 35,
      reason: { de: 'nahezu ausgeglichen', en: 'nearly balanced matchup' }
    },
    {
      match: 'Südkorea vs Ghana',
      score: '1:1',
      home: 30,
      draw: 40,
      away: 30,
      reason: { de: 'offenes Spiel', en: 'open game profile' }
    }
  ],
  Kolumbien: [
    {
      match: 'Kolumbien vs Argentinien',
      score: '1:2',
      home: 20,
      draw: 25,
      away: 55,
      reason: { de: 'Argentinien etwas stärker', en: 'Argentina has more quality' }
    },
    {
      match: 'Kolumbien vs Österreich',
      score: '2:1',
      home: 50,
      draw: 30,
      away: 20,
      reason: { de: 'leichter Vorteil', en: 'slight overall edge' }
    },
    {
      match: 'Kolumbien vs Saudi-Arabien',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'klar überlegen', en: 'clear favorite' }
    }
  ],
  Österreich: [
    {
      match: 'Österreich vs Argentinien',
      score: '1:2',
      home: 15,
      draw: 25,
      away: 60,
      reason: { de: 'Argentinien etwas stärker', en: 'Argentina has more quality' }
    },
    {
      match: 'Österreich vs Kolumbien',
      score: '1:2',
      home: 20,
      draw: 30,
      away: 50,
      reason: { de: 'Kolumbien mit leichtem Vorteil', en: 'Colombia has a slight edge' }
    },
    {
      match: 'Österreich vs Saudi-Arabien',
      score: '2:0',
      home: 65,
      draw: 20,
      away: 15,
      reason: { de: 'mehr Qualität', en: 'higher overall quality' }
    }
  ],
  'Saudi-Arabien': [
    {
      match: 'Saudi-Arabien vs Argentinien',
      score: '0:3',
      home: 5,
      draw: 10,
      away: 85,
      reason: { de: 'Argentinien deutlich stärker', en: 'Argentina is far stronger' }
    },
    {
      match: 'Saudi-Arabien vs Kolumbien',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Kolumbien überlegen', en: 'Colombia is stronger overall' }
    },
    {
      match: 'Saudi-Arabien vs Österreich',
      score: '0:2',
      home: 15,
      draw: 20,
      away: 65,
      reason: { de: 'Österreich mit mehr Qualität', en: 'Austria has more quality' }
    }
  ],
  Marokko: [
    {
      match: 'Marokko vs Spanien',
      score: '1:2',
      home: 20,
      draw: 25,
      away: 55,
      reason: { de: 'Spanien etwas stärker', en: 'Spain has a slight edge' }
    },
    {
      match: 'Marokko vs Ecuador',
      score: '1:1',
      home: 35,
      draw: 35,
      away: 30,
      reason: { de: 'enges Duell', en: 'tight matchup' }
    },
    {
      match: 'Marokko vs Neuseeland',
      score: '2:0',
      home: 70,
      draw: 20,
      away: 10,
      reason: { de: 'stärkeres Team', en: 'stronger overall team' }
    }
  ],
  Ecuador: [
    {
      match: 'Ecuador vs Deutschland',
      score: '0:2',
      home: 12,
      draw: 20,
      away: 68,
      reason: { de: 'Deutschland mit mehr Qualität', en: 'Germany has more quality' }
    },
    {
      match: 'Ecuador vs Marokko',
      score: '1:1',
      home: 30,
      draw: 35,
      away: 35,
      reason: { de: 'eng und ausgeglichen', en: 'close and balanced' }
    },
    {
      match: 'Ecuador vs Neuseeland',
      score: '2:0',
      home: 65,
      draw: 20,
      away: 15,
      reason: { de: 'klarer Vorteil', en: 'clear advantage' }
    }
  ],
  Neuseeland: [
    {
      match: 'Neuseeland vs Spanien',
      score: '0:3',
      home: 5,
      draw: 15,
      away: 80,
      reason: { de: 'Spanien klar überlegen', en: 'Spain is clearly superior' }
    },
    {
      match: 'Neuseeland vs Marokko',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Marokko besser besetzt', en: 'Morocco has more quality' }
    },
    {
      match: 'Neuseeland vs Ecuador',
      score: '0:2',
      home: 15,
      draw: 20,
      away: 65,
      reason: { de: 'Ecuador stärker', en: 'Ecuador is stronger overall' }
    }
  ],
  Paraguay: [
    {
      match: 'Paraguay vs Portugal',
      score: '1:2',
      home: 20,
      draw: 25,
      away: 55,
      reason: { de: 'Portugal mit mehr Klasse', en: 'Portugal has more class' }
    },
    {
      match: 'Paraguay vs Algerien',
      score: '1:1',
      home: 35,
      draw: 35,
      away: 30,
      reason: { de: 'ausgeglichen', en: 'balanced matchup' }
    },
    {
      match: 'Paraguay vs Kap Verde',
      score: '2:0',
      home: 65,
      draw: 20,
      away: 15,
      reason: { de: 'mehr Erfahrung', en: 'more experience' }
    }
  ],
  Algerien: [
    {
      match: 'Algerien vs Argentinien',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Argentinien überlegen', en: 'Argentina is stronger overall' }
    },
    {
      match: 'Algerien vs Paraguay',
      score: '1:1',
      home: 30,
      draw: 35,
      away: 35,
      reason: { de: 'knappes Spiel', en: 'close matchup' }
    },
    {
      match: 'Algerien vs Kap Verde',
      score: '1:0',
      home: 50,
      draw: 30,
      away: 20,
      reason: { de: 'leichter Vorteil', en: 'slight edge' }
    }
  ],
  'Kap Verde': [
    {
      match: 'Kap Verde vs Spanien',
      score: '0:2',
      home: 10,
      draw: 15,
      away: 75,
      reason: { de: 'Spanien klar stärker', en: 'Spain is clearly stronger' }
    },
    {
      match: 'Kap Verde vs Paraguay',
      score: '0:2',
      home: 15,
      draw: 20,
      away: 65,
      reason: { de: 'Paraguay überlegen', en: 'Paraguay has the edge' }
    },
    {
      match: 'Kap Verde vs Algerien',
      score: '0:1',
      home: 20,
      draw: 30,
      away: 50,
      reason: { de: 'Algerien leicht besser', en: 'Algeria is slightly stronger' }
    }
  ],
  Norwegen: [
    {
      match: 'Norwegen vs Frankreich',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Frankreich stärker', en: 'France is stronger overall' }
    },
    {
      match: 'Norwegen vs Belgien',
      score: '1:2',
      home: 20,
      draw: 25,
      away: 55,
      reason: { de: 'Belgien etwas stärker', en: 'Belgium has a slight edge' }
    },
    {
      match: 'Norwegen vs Südafrika',
      score: '2:1',
      home: 50,
      draw: 30,
      away: 20,
      reason: { de: 'leichter Vorteil', en: 'slight advantage' }
    }
  ],
  Südafrika: [
    {
      match: 'Südafrika vs Mexiko',
      score: '1:2',
      home: 20,
      draw: 25,
      away: 55,
      reason: { de: 'Mexiko etwas stärker', en: 'Mexico has a slight edge' }
    },
    {
      match: 'Südafrika vs Belgien',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Belgien überlegen', en: 'Belgium is superior' }
    },
    {
      match: 'Südafrika vs Norwegen',
      score: '1:2',
      home: 20,
      draw: 30,
      away: 50,
      reason: { de: 'Norwegen leicht stärker', en: 'Norway is slightly stronger' }
    }
  ],
  Curaçao: [
    {
      match: 'Curaçao vs Deutschland',
      score: '0:3',
      home: 5,
      draw: 10,
      away: 85,
      reason: { de: 'Deutschland klar überlegen', en: 'Germany is clearly superior' }
    }
  ],
  Elfenbeinküste: [
    {
      match: 'Elfenbeinküste vs Deutschland',
      score: '1:2',
      home: 15,
      draw: 25,
      away: 60,
      reason: { de: 'Deutschland mit mehr Qualität', en: 'Germany has more quality' }
    }
  ],
  Haiti: [
    {
      match: 'Haiti vs Brasilien',
      score: '0:3',
      home: 5,
      draw: 10,
      away: 85,
      reason: { de: 'Brasilien viel stärker', en: 'Brazil is much stronger' }
    }
  ],
  Schottland: [
    {
      match: 'Schottland vs Brasilien',
      score: '0:2',
      home: 10,
      draw: 20,
      away: 70,
      reason: { de: 'Brasilien stärker', en: 'Brazil is stronger overall' }
    }
  ],
  Ägypten: [
    {
      match: 'Ägypten vs Belgien',
      score: '1:2',
      home: 15,
      draw: 25,
      away: 60,
      reason: { de: 'Belgien etwas stärker', en: 'Belgium has the edge' }
    }
  ],
  Usbekistan: [
    {
      match: 'Usbekistan vs Portugal',
      score: '0:3',
      home: 5,
      draw: 15,
      away: 80,
      reason: { de: 'Portugal klar überlegen', en: 'Portugal is clearly stronger' }
    }
  ],
  Jordanien: [
    {
      match: 'Jordanien vs Argentinien',
      score: '0:3',
      home: 5,
      draw: 10,
      away: 85,
      reason: { de: 'Argentinien deutlich stärker', en: 'Argentina is far stronger' }
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
  Senegal: '🇸🇳',
  Uruguay: '🇺🇾',
  Panama: '🇵🇦',
  Iran: '🇮🇷',
  Australien: '🇦🇺',
  Tunesien: '🇹🇳',
  Kroatien: '🇭🇷',
  Ghana: '🇬🇭',
  Südkorea: '🇰🇷',
  Kolumbien: '🇨🇴',
  Österreich: '🇦🇹',
  'Saudi-Arabien': '🇸🇦',
  Marokko: '🇲🇦',
  Ecuador: '🇪🇨',
  Neuseeland: '🇳🇿',
  Paraguay: '🇵🇾',
  Algerien: '🇩🇿',
  'Kap Verde': '🇨🇻',
  Norwegen: '🇳🇴',
  Südafrika: '🇿🇦',
  Curaçao: '🇨🇼',
  Elfenbeinküste: '🇨🇮',
  Haiti: '🇭🇹',
  Schottland: '🏴',
  Ägypten: '🇪🇬',
  Usbekistan: '🇺🇿',
  Jordanien: '🇯🇴'
};

const featuredTeams = ['Deutschland', 'Brasilien', 'Frankreich', 'England', 'Argentinien', 'Spanien'];
const allTeams = Object.keys(data).sort((a, b) => a.localeCompare(b, 'de'));

const ranking = [
  { team: 'Brasilien', chance: 24 },
  { team: 'Frankreich', chance: 19 },
  { team: 'Deutschland', chance: 16 },
  { team: 'Argentinien', chance: 14 }
];

const groups: GroupData[] = [
  {
    group: 'A',
    teams: ['Deutschland', 'Japan', 'Mexiko', 'Senegal'],
    table: [
      { team: 'Deutschland', pts: 7, gf: 6, ga: 1, advance: 88 },
      { team: 'Mexiko', pts: 4, gf: 3, ga: 3, advance: 54 },
      { team: 'Senegal', pts: 3, gf: 2, ga: 3, advance: 36 },
      { team: 'Japan', pts: 2, gf: 2, ga: 6, advance: 22 }
    ]
  },
  {
    group: 'B',
    teams: ['Brasilien', 'Uruguay', 'Iran', 'Panama'],
    table: [
      { team: 'Brasilien', pts: 9, gf: 7, ga: 1, advance: 95 },
      { team: 'Uruguay', pts: 6, gf: 5, ga: 2, advance: 79 },
      { team: 'Iran', pts: 1, gf: 1, ga: 5, advance: 16 },
      { team: 'Panama', pts: 1, gf: 1, ga: 6, advance: 10 }
    ]
  },
  {
    group: 'C',
    teams: ['Frankreich', 'USA', 'Australien', 'Tunesien'],
    table: [
      { team: 'Frankreich', pts: 9, gf: 6, ga: 1, advance: 93 },
      { team: 'USA', pts: 6, gf: 5, ga: 2, advance: 74 },
      { team: 'Australien', pts: 1, gf: 1, ga: 4, advance: 18 },
      { team: 'Tunesien', pts: 1, gf: 1, ga: 6, advance: 15 }
    ]
  },
  {
    group: 'D',
    teams: ['England', 'Kroatien', 'Ghana', 'Südkorea'],
    table: [
      { team: 'England', pts: 9, gf: 7, ga: 1, advance: 91 },
      { team: 'Kroatien', pts: 4, gf: 4, ga: 4, advance: 57 },
      { team: 'Südkorea', pts: 2, gf: 2, ga: 4, advance: 27 },
      { team: 'Ghana', pts: 1, gf: 2, ga: 6, advance: 19 }
    ]
  },
  {
    group: 'E',
    teams: ['Argentinien', 'Kolumbien', 'Österreich', 'Saudi-Arabien'],
    table: [
      { team: 'Argentinien', pts: 9, gf: 8, ga: 1, advance: 94 },
      { team: 'Kolumbien', pts: 6, gf: 5, ga: 3, advance: 71 },
      { team: 'Österreich', pts: 3, gf: 3, ga: 4, advance: 28 },
      { team: 'Saudi-Arabien', pts: 0, gf: 0, ga: 8, advance: 7 }
    ]
  },
  {
    group: 'F',
    teams: ['Spanien', 'Marokko', 'Ecuador', 'Neuseeland'],
    table: [
      { team: 'Spanien', pts: 9, gf: 7, ga: 1, advance: 92 },
      { team: 'Marokko', pts: 4, gf: 3, ga: 3, advance: 58 },
      { team: 'Ecuador', pts: 4, gf: 3, ga: 3, advance: 46 },
      { team: 'Neuseeland', pts: 0, gf: 0, ga: 6, advance: 4 }
    ]
  },
  {
    group: 'G',
    teams: ['Portugal', 'Paraguay', 'Algerien', 'Kap Verde'],
    table: [
      { team: 'Portugal', pts: 9, gf: 7, ga: 1, advance: 90 },
      { team: 'Paraguay', pts: 4, gf: 3, ga: 3, advance: 55 },
      { team: 'Algerien', pts: 4, gf: 2, ga: 3, advance: 41 },
      { team: 'Kap Verde', pts: 0, gf: 0, ga: 5, advance: 6 }
    ]
  },
  {
    group: 'H',
    teams: ['Niederlande', 'Belgien', 'Südafrika', 'Norwegen'],
    table: [
      { team: 'Belgien', pts: 7, gf: 6, ga: 2, advance: 82 },
      { team: 'Niederlande', pts: 6, gf: 5, ga: 2, advance: 76 },
      { team: 'Norwegen', pts: 3, gf: 3, ga: 4, advance: 24 },
      { team: 'Südafrika', pts: 1, gf: 1, ga: 7, advance: 12 }
    ]
  }
];

const ui = {
  de: {
    brandTitle: 'WM KI Predictor',
    brandSubtitle: 'Professionelle Turnier-Prognosen',
    navFavorites: 'Favoriten',
    navGroups: 'Gruppen',
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
    groupsLabel: 'WM-Gruppen',
    groupsTitle: 'Alle Gruppen im Überblick',
    groupsText: 'Gruppenkarten und Tabellen geben einen schnellen Überblick auf Platzierungen, Punkte und Weiterkommen-Chancen.',
    groupLabel: 'Gruppe',
    groupFavorite: 'Favorit',
    groupContender: 'Gefährlich',
    groupUnderdog: 'Außenseiter',
    tableTitle: 'Gruppentabelle',
    pts: 'Pkt',
    gf: 'T',
    ga: 'GT',
    advanceChance: 'Weiter %',
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
    navGroups: 'Groups',
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
    groupsLabel: 'World Cup Groups',
    groupsTitle: 'All groups at a glance',
    groupsText: 'Group cards and tables give a fast overview of rankings, points and qualification chances.',
    groupLabel: 'Group',
    groupFavorite: 'Favorite',
    groupContender: 'Dangerous',
    groupUnderdog: 'Underdog',
    tableTitle: 'Group table',
    pts: 'Pts',
    gf: 'GF',
    ga: 'GA',
    advanceChance: 'Adv %',
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

function getGroupTag(team: string, lang: Lang) {
  const favorites = ['Brasilien', 'Frankreich', 'Deutschland', 'Argentinien', 'Spanien', 'England'];
  const contenders = ['Portugal', 'USA', 'Niederlande', 'Belgien', 'Japan', 'Mexiko', 'Kolumbien', 'Uruguay'];

  if (favorites.includes(team)) return ui[lang].groupFavorite;
  if (contenders.includes(team)) return ui[lang].groupContender;
  return ui[lang].groupUnderdog;
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

      <button className="cta-button secondary" onClick={onToggle} type="button">
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

function GroupTable({
  group,
  lang,
  activeTeam,
  onSelectTeam
}: {
  group: GroupData;
  lang: Lang;
  activeTeam: string;
  onSelectTeam: (team: string) => void;
}) {
  const t = ui[lang];

  return (
    <div className="group-table-wrap">
      <div className="group-table-head">
        <strong>{t.tableTitle}</strong>
      </div>

      <div className="group-table">
        <div className="group-table-row group-table-header">
          <span>#</span>
          <span>Team</span>
          <span>{t.pts}</span>
          <span>{t.gf}</span>
          <span>{t.ga}</span>
          <span>{t.advanceChance}</span>
        </div>

        {group.table.map((entry, index) => (
          <button
            key={entry.team}
            type="button"
            className={`group-table-row group-table-button ${activeTeam === entry.team ? 'active' : ''}`}
            onClick={() => onSelectTeam(entry.team)}
          >
            <span>{index + 1}</span>
            <span className="group-table-team">
              {flags[entry.team] || '⚽'} {entry.team}
            </span>
            <span>{entry.pts}</span>
            <span>{entry.gf}</span>
            <span>{entry.ga}</span>
            <span>{entry.advance}%</span>
          </button>
        ))}
      </div>
    </div>
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
        ? 'WM 2026 Prognosen mit KI: Match-Vorhersagen, Wahrscheinlichkeiten, Favoriten-Ranking, Gruppen und Team-Analysen.'
        : 'World Cup 2026 predictions with AI: match forecasts, probabilities, favorites ranking, groups and team analysis.';
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
  const topMatch = data.Brasilien[0];
  const t = ui[lang];

  const selectTeamAndJump = (selectedTeam: string) => {
    setTeam(selectedTeam);
    setOpenMatch(null);
    document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            <button
              onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}
              type="button"
            >
              {t.navFavorites}
            </button>
            <button
              onClick={() => document.getElementById('groups')?.scrollIntoView({ behavior: 'smooth' })}
              type="button"
            >
              {t.navGroups}
            </button>
            <button
              onClick={() => document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' })}
              type="button"
            >
              {t.navTeams}
            </button>
            <button
              onClick={() => document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' })}
              type="button"
            >
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
                type="button"
              >
                {t.heroPrimary}
              </button>

              <button
                className="ghost-button"
                onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}
                type="button"
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

        <section id="groups" className="section-block">
          <div className="section-header-v2">
            <div>
              <p className="section-label">{t.groupsLabel}</p>
              <h2>{t.groupsTitle}</h2>
              <p className="section-subtext">{t.groupsText}</p>
            </div>
            <span className="header-chip">{groups.length} {lang === 'de' ? 'Gruppen' : 'Groups'}</span>
          </div>

          <div className="groups-grid">
            {groups.map((group) => (
              <article key={group.group} className="group-card">
                <div className="group-card-head">
                  <p className="section-label">{t.groupLabel}</p>
                  <h3>{t.groupLabel} {group.group}</h3>
                </div>

                <div className="group-team-list">
                  {group.teams.map((entry) => (
                    <button
                      key={entry}
                      className={`group-team-item ${team === entry ? 'active' : ''}`}
                      type="button"
                      onClick={() => selectTeamAndJump(entry)}
                    >
                      <div className="group-team-main">
                        <span className="group-team-name">
                          {flags[entry] || '⚽'} {entry}
                        </span>
                        <span className="group-team-tag">{getGroupTag(entry, lang)}</span>
                      </div>
                      <span className="group-team-arrow">→</span>
                    </button>
                  ))}
                </div>

                <GroupTable
                  group={group}
                  lang={lang}
                  activeTeam={team}
                  onSelectTeam={selectTeamAndJump}
                />
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
                  {flags[entry] || '⚽'} {entry}
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