export type GeometryType = 
  | 'espiral'      // Ansiedad / búsqueda
  | 'agujero'      // Duelo / vacío
  | 'centro'       // Pertenencia / núcleo
  | 'interseccion' // Amor / encuentro
  | 'fractura'     // Rechazo / ruptura
  | 'expansion'    // Asombro / fervor
  | 'laberinto';   // Memoria / nostalgia

export interface ConceptualOrgan {
  id: string;
  name: string;
  functionText: string;
  emotion: string;
  sound: string;
  geometry: string;
  diseases: string;
  mutaciones: string;
  poeticText: string;
  color: string;
}

export interface TranslationVector {
  alphabet: {
    lettersCount: number;
    valueSum: number;
    vowelRatio: number;
    consonantsCount: number;
    gematriaScore: number;
    seed: number;
  };
  emotions: {
    dominant: string;
    dominantScore: number;
    secondary: string;
    secondaryScore: number;
    all: { name: string; score: number }[];
  };
  organs: {
    primary: ConceptualOrgan;
    secondary: ConceptualOrgan;
  };
  animal: {
    archetype: string;
    phylum: string;
    traits: string[];
  };
  movement: {
    geometryType: GeometryType;
    geometryLabel: string;
    cadence: string;
    speed: number;
    description: string;
  };
  color: {
    primaryHex: string;
    secondaryHex: string;
    accentHex: string;
    backgroundHex: string;
    hslPrimary: string;
    name: string;
  };
  sound: {
    pitchHz: number;
    waveform: OscillatorType;
    timbre: string;
    bpm: number;
    description: string;
  };
  texture: {
    name: string;
    description: string;
  };
  temperature: {
    celsius: number;
    description: string;
  };
  narrative: {
    habitat: string;
    feeding: string[];
    predators: string[];
    pathology: string;
    medicine: string;
  };
}

export interface LivingOrganism {
  id: string;
  name: string;
  sourceText: string;
  speciesName: string;
  kingdom: string;
  vector: TranslationVector;
  poeticText: string;
  relations: string[];
  isCanonical?: boolean;
  createdAt: number;
}

export interface CharacterEntity {
  id: string;
  name: string;
  subtitle?: string;
  epithet: string;
  description: string;
  associatedOrgans: string[];
  colors: string[];
  geometry: string;
  memories: string[];
  relations: { target: string; type: string }[];
}

export interface RelationalNode {
  id: string;
  label: string;
  type: 'character' | 'organ' | 'emotion' | 'creature' | 'concept' | 'element';
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  color?: string;
  size?: number;
}

export interface RelationalEdge {
  source: string;
  target: string;
  label: string;
  strength: number;
}
