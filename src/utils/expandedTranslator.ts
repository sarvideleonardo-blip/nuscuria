import { LivingOrganism, TranslationVector, GeometryType, ConceptualOrgan } from '../types';
import { CANONICAL_ORGANS } from '../data/canonicalData';

// Deterministic seed generator from string
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Map letter to 1..26
function charValue(c: string): number {
  const code = c.toUpperCase().charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return code - 64;
  }
  return 0;
}

export function translateTextToOrganism(rawInput: string): LivingOrganism {
  const input = rawInput.trim() || 'Carbón que respira';
  const lower = input.toLowerCase();
  const seed = hashString(input);

  // Alphabet layer
  let valueSum = 0;
  let vowelsCount = 0;
  let consonantsCount = 0;
  const vowelsList = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];

  for (let i = 0; i < input.length; i++) {
    const ch = input[i].toLowerCase();
    const val = charValue(ch);
    if (val > 0) {
      valueSum += val;
      if (vowelsList.includes(ch)) vowelsCount++;
      else consonantsCount++;
    }
  }
  const lettersCount = Math.max(1, vowelsCount + consonantsCount);
  const vowelRatio = Number((vowelsCount / lettersCount).toFixed(2));
  const gematriaScore = valueSum % 108 + 1;

  // Emotion determination
  let dominantEmotion = 'Asombro';
  let dominantScore = 75;
  let secondaryEmotion = 'Melancolía';
  let secondaryScore = 50;

  // Exact canonical match checks
  if (lower.includes('carbón') || lower.includes('carbon') || lower.includes('respira')) {
    dominantEmotion = 'Melancolía';
    dominantScore = 70;
    secondaryEmotion = 'Asombro';
    secondaryScore = 40;
  } else if (lower.includes('abductor') || lower.includes('amor')) {
    dominantEmotion = 'Fervor';
    dominantScore = 90;
    secondaryEmotion = 'Posesión';
    secondaryScore = 80;
  } else if (lower.includes('menos rechazo') || lower.includes('rechazo')) {
    dominantEmotion = 'Apertura';
    dominantScore = 85;
    secondaryEmotion = 'Serenidad';
    secondaryScore = 75;
  } else if (lower.includes('pulpo') || lower.includes('ontol')) {
    dominantEmotion = 'Asombro';
    dominantScore = 88;
    secondaryEmotion = 'Curiosidad';
    secondaryScore = 74;
  } else if (lower.includes('renata')) {
    dominantEmotion = 'Ternura';
    dominantScore = 95;
    secondaryEmotion = 'Pertenencia';
    secondaryScore = 80;
  } else {
    // Algorithmic emotion mapping
    const emotionPool = [
      { name: 'Ternura', score: ((seed % 40) + 60) },
      { name: 'Melancolía', score: (((seed >> 2) % 45) + 50) },
      { name: 'Asombro', score: (((seed >> 4) % 50) + 45) },
      { name: 'Fervor', score: (((seed >> 6) % 60) + 35) },
      { name: 'Fascinación', score: (((seed >> 8) % 50) + 40) },
      { name: 'Curiosidad', score: (((seed >> 10) % 55) + 40) },
      { name: 'Nostalgia', score: (((seed >> 3) % 45) + 50) },
      { name: 'Sosiego', score: (((seed >> 5) % 40) + 55) }
    ];
    emotionPool.sort((a, b) => b.score - a.score);
    dominantEmotion = emotionPool[0].name;
    dominantScore = emotionPool[0].score;
    secondaryEmotion = emotionPool[1].name;
    secondaryScore = emotionPool[1].score;
  }

  // Affective Geometry
  let geometryType: GeometryType = 'espiral';
  let geometryLabel = 'Espiral Radial';
  let cadence = 'Respiración lenta y profunda';
  let speed = 2.4;
  let movementDesc = 'Contracción y dilatación cíclica sin principio ni fin';

  if (dominantEmotion === 'Melancolía' || lower.includes('duelo') || lower.includes('carbon') || lower.includes('carbón')) {
    geometryType = 'agujero';
    geometryLabel = 'Agujero y vórtice mineral';
    cadence = 'Respiración fósil lenta';
    speed = 3.6;
    movementDesc = 'Inhalación mineral pesada que retiene ceniza y exhala brasa';
  } else if (dominantEmotion === 'Fervor' || lower.includes('abductor')) {
    geometryType = 'expansion';
    geometryLabel = 'Expansión radial y pulsos';
    cadence = 'Ondas concéntricas aceleradas';
    speed = 1.2;
    movementDesc = 'Propagación de filamentos luminosos en busca de fusión';
  } else if (dominantEmotion === 'Apertura' || dominantEmotion === 'Sosiego' || lower.includes('menos rechazo')) {
    geometryType = 'interseccion';
    geometryLabel = 'Curvas suaves sinusoidales';
    cadence = 'Deriva acuática y relajación';
    speed = 2.8;
    movementDesc = 'Apertura de membranas que desmantelan tensiones hostiles';
  } else if (dominantEmotion === 'Ternura' || lower.includes('renata')) {
    geometryType = 'centro';
    geometryLabel = 'Centro concéntrico acogedor';
    cadence = 'Latido análogo sereno';
    speed = 2.0;
    movementDesc = 'Atracción armónica que convierte lo distante en suelo común';
  } else if (lower.includes('rechazo') || lower.includes('fractura')) {
    geometryType = 'fractura';
    geometryLabel = 'Líneas quebradas y aristas vivas';
    cadence = 'Síncopa y sobresalto';
    speed = 1.6;
    movementDesc = 'Dispersión de fragmentos que rehúyen la captura';
  } else if (lower.includes('pulpo') || lower.includes('pregunta')) {
    geometryType = 'espiral';
    geometryLabel = 'Espiral radial de búsqueda';
    cadence = 'Ondulación palpante';
    speed = 2.1;
    movementDesc = 'Tentáculos que palpan bordes difusos y habitan paradojas';
  } else {
    const geometries: { type: GeometryType; label: string }[] = [
      { type: 'espiral', label: 'Espiral radial de búsqueda' },
      { type: 'expansion', label: 'Expansión radial asombrosa' },
      { type: 'centro', label: 'Centro concéntrico de pertenencia' },
      { type: 'interseccion', label: 'Intersección afectiva resonante' },
      { type: 'laberinto', label: 'Laberinto dendrítico de memoria' }
    ];
    const picked = geometries[seed % geometries.length];
    geometryType = picked.type;
    geometryLabel = picked.label;
  }

  // Organs assignment
  let primaryOrgan = CANONICAL_ORGANS[0]; // Corazón Análogo
  let secondaryOrgan = CANONICAL_ORGANS[1]; // Pulmón Fósil

  if (lower.includes('pulpo') || lower.includes('tentacul')) {
    primaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'tentaculos-ontologicos') || CANONICAL_ORGANS[2];
    secondaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'corazon-analogo') || CANONICAL_ORGANS[0];
  } else if (lower.includes('carbón') || lower.includes('carbon') || lower.includes('respira')) {
    primaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'pulmon-fosil') || CANONICAL_ORGANS[1];
    secondaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'corazon-analogo') || CANONICAL_ORGANS[0];
  } else if (lower.includes('abductor') || lower.includes('amor')) {
    primaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'tentaculos-ontologicos') || CANONICAL_ORGANS[2];
    secondaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'corazon-analogo') || CANONICAL_ORGANS[0];
  } else if (lower.includes('menos rechazo')) {
    primaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'membrana-pertenencia') || CANONICAL_ORGANS[8];
    secondaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'sistema-nervioso-topologico') || CANONICAL_ORGANS[7];
  } else if (lower.includes('renata')) {
    primaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'corazon-analogo') || CANONICAL_ORGANS[0];
    secondaryOrgan = CANONICAL_ORGANS.find(o => o.id === 'vertebras-nostalgia') || CANONICAL_ORGANS[6];
  } else {
    const organIdx1 = seed % CANONICAL_ORGANS.length;
    const organIdx2 = (seed + 3) % CANONICAL_ORGANS.length;
    primaryOrgan = CANONICAL_ORGANS[organIdx1];
    secondaryOrgan = CANONICAL_ORGANS[organIdx2];
  }

  // Animal Archetype & Phylum
  let archetype = 'Cefalópodo conceptual';
  let phylum = 'Invertebrados filosóficos';
  let traits = ['Palpación de paradojas', 'Tinta que complejiza', 'Ausencia de dogma'];

  if (lower.includes('carbón') || lower.includes('carbon')) {
    archetype = 'Mamífero mineral';
    phylum = 'Litofauna orgánica';
    traits = ['Costillas abiertas de roca', 'Ramificaciones como astas fósiles', 'Respiración de ceniza'];
  } else if (lower.includes('abductor') || lower.includes('amor')) {
    archetype = 'Medusa radial luminosa';
    phylum = 'Cnidaria de fervor';
    traits = ['Bioluminiscencia pulsante', 'Tentáculos de atracción pura', 'Aura sincrónica'];
  } else if (lower.includes('menos rechazo')) {
    archetype = 'Organismo-paisaje acuático';
    phylum = 'Fauna de remanso';
    traits = ['Manto de algas sedosas', 'Flotabilidad neutra', 'Absorción de fricción'];
  } else if (lower.includes('renata')) {
    archetype = 'Árbol simbiótico de ternura';
    phylum = 'Seres de pan y ventana';
    traits = ['Raíces que abrazan ruinas', 'Respiración compartida', 'Germinación continua'];
  } else {
    const archetypes = [
      { name: 'Cetáceo espectral', phy: 'Plegamiento abisal', traits: ['Canto hipoacústico', 'Memoria oceánica', 'Vuelo submarino'] },
      { name: 'Ciervo dendrítico', phy: 'Fauna de bosque interior', traits: ['Astas de calcio vivo', 'Pisada vegetal', 'Silencio ritual'] },
      { name: 'Insecto topológico', phy: 'Artrópodos no-euclidianos', traits: ['Ojos facetados de tiempo', 'Quitinosa resonancia', 'Metamorfosis lingüística'] },
      { name: 'Reptil de obsidiana', phy: 'Saurios telúricos', traits: ['Piel escamosa de grafito', 'Sangre tibia mineral', 'Inmovilidad paciente'] }
    ];
    const pickedArch = archetypes[seed % archetypes.length];
    archetype = pickedArch.name;
    phylum = pickedArch.phy;
    traits = pickedArch.traits;
  }

  // Sound layer (Web Audio parameters)
  let pitchHz = 54;
  let timbre = 'Grave húmedo y resonante';
  let waveform: OscillatorType = 'sine';
  let bpm = 48;

  if (lower.includes('carbón') || lower.includes('carbon')) {
    pitchHz = 42;
    timbre = 'Resoplido cavernoso de carbón y brasa';
    waveform = 'triangle';
    bpm = 36;
  } else if (lower.includes('abductor') || lower.includes('amor')) {
    pitchHz = 528;
    timbre = 'Campana de cristal con sobretonos de fervor';
    waveform = 'sawtooth';
    bpm = 84;
  } else if (lower.includes('menos rechazo')) {
    pitchHz = 216;
    timbre = 'Susurro acuático y oleaje suave';
    waveform = 'sine';
    bpm = 42;
  } else if (lower.includes('pulpo')) {
    pitchHz = 108;
    timbre = 'Grave húmedo con pulsos concéntricos';
    waveform = 'sine';
    bpm = 50;
  } else {
    pitchHz = 60 + (seed % 380);
    bpm = 40 + (seed % 40);
    timbre = `${pitchHz} Hz con resonancia de ${primaryOrgan.name.toLowerCase()}`;
  }

  // Color Layer
  let primaryHex = '#38bdf8';
  let secondaryHex = '#1e293b';
  let accentHex = '#d4af37';
  let backgroundHex = '#090b10';
  let colorName = 'Cobalto y Ceniza';

  if (lower.includes('carbón') || lower.includes('carbon')) {
    primaryHex = '#e0533c'; // Brasa volcánica
    secondaryHex = '#1c1d22'; // Negro volcánico
    accentHex = '#878a99'; // Gris ceniza
    backgroundHex = '#0c0d10';
    colorName = 'Negro volcánico, carbón y rojo brasa';
  } else if (lower.includes('abductor') || lower.includes('amor')) {
    primaryHex = '#ff4d6d';
    secondaryHex = '#7209b7';
    accentHex = '#ffd166';
    backgroundHex = '#100517';
    colorName = 'Escarlata fervor, violeta abisal y oro solar';
  } else if (lower.includes('menos rechazo')) {
    primaryHex = '#2ec4b6';
    secondaryHex = '#011627';
    accentHex = '#a7c957';
    backgroundHex = '#06131c';
    colorName = 'Verde esmeralda, turquesa sereno y agua profunda';
  } else if (lower.includes('pulpo')) {
    primaryHex = '#4361ee';
    secondaryHex = '#03045e';
    accentHex = '#4cc9f0';
    backgroundHex = '#040817';
    colorName = 'Azules abisales profundos y tinta de interrogación';
  } else if (lower.includes('renata')) {
    primaryHex = '#2d6a4f';
    secondaryHex = '#1b4332';
    accentHex = '#d4af37';
    backgroundHex = '#07130e';
    colorName = 'Verde bosque oscuro, pan dorado y savia viva';
  } else {
    // Procedural color from seed
    const hue = (seed * 137.5) % 360;
    primaryHex = `hsl(${Math.round(hue)}, 65%, 55%)`;
    secondaryHex = `hsl(${Math.round((hue + 40) % 360)}, 35%, 18%)`;
    accentHex = `hsl(${Math.round((hue + 180) % 360)}, 80%, 65%)`;
    backgroundHex = `hsl(${Math.round(hue)}, 25%, 6%)`;
    colorName = `Cromía espectral tono ${Math.round(hue)}°`;
  }

  // Texture & Temperature
  const textures = [
    { name: 'Poroso y mineral', description: 'Superficie de basalto que filtra la niebla circundante' },
    { name: 'Membranoso y húmedo', description: 'Tejido elástico que palpita con cada variación de presión' },
    { name: 'Fibroso y vegetal', description: 'Filamentos que se entrelazan como raíces en tierra blanda' },
    { name: 'Vítreo y cristalino', description: 'Bordes pulidos que refractan la luz en prismas sutiles' },
    { name: 'Aterciopelado', description: 'Vellosidad densa que apaga ruidos y conserva la calidez' }
  ];
  const pickedTexture = textures[seed % textures.length];
  const temperatureC = Math.round(((seed % 60) - 15) * 10) / 10;

  // Narrative / Ontology
  let habitat = 'Ruinas afectivas y grietas entre nombres';
  let feeding = ['Paradojas no resueltas', 'Preguntas que no admiten dogma', 'Bordes difusos del lenguaje'];
  let predators = ['Dogmas cerrados', 'Certezas definitivas', 'Algoritmos sin imprecisión'];
  let pathology = 'Esclerotización por exceso de respuestas acabadas';
  let medicine = 'Aceptar la imprecisión y descansar en frecuencias afines';

  if (lower.includes('carbón') || lower.includes('carbon')) {
    habitat = 'Estrato inferior de ruinas afectivas y lechos de ceniza';
    feeding = ['Silencios antiguos', 'Calor residual de despedidas', 'Oxígeno mineral'];
    predators = ['Viento helado del olvido', 'Extinción de la brasa'];
    pathology = 'Enfriamiento del pulmón fósil';
    medicine = 'Respiración pausada en proximidad de un corazón análogo';
  } else if (lower.includes('abductor')) {
    habitat = 'Espacio de colisión pasional y zonas de alta tensión emotiva';
    feeding = ['Fervor incontinente', 'Destellos de entrega', 'Resonancia pura'];
    predators = ['Indiferencia aséptica', 'Cálculo utilitario'];
    pathology = 'Sobrecarga de campo radial que extingue al huésped';
    medicine = 'Ternura diluida con menos rechazo';
  } else if (lower.includes('menos rechazo')) {
    habitat = 'Ensenadas de calma, aguas templadas y remansos sin vigilancia';
    feeding = ['Treguas espontáneas', 'Descanso de la sospecha', 'Tiempo sin urgencia'];
    predators = ['Prejuicio rígido', 'Alerta defensiva crónica'];
    pathology = 'Turbidez por corrientes hostiles';
    medicine = 'Apertura gradual de la membrana de pertenencia';
  } else if (lower.includes('pulpo')) {
    habitat = 'Abismo conceptual y márgenes de los diccionarios';
    feeding = ['Paradojas', 'Preguntas', 'Bordes difusos'];
    predators = ['Dogmas', 'Identidades rígidas', 'Respuestas definitivas'];
    pathology = 'Perder una certeza sin que brote otra duda';
    medicine = 'Palpación de ruinas y secreción de tinta complejizadora';
  }

  // Poetic quotation
  let poeticText = '';
  if (lower.includes('pulpo')) {
    poeticText = `No posee ojos. Posee preguntas.
Cada tentáculo explora una versión distinta del ser.
No captura. Palpa. Abraza ruinas.
Se alimenta de categorías mal cerradas.
Cuando pierde una certeza, le crece otra duda.
Su tinta no oscurece: complejiza.
Habita grietas entre nombres. Nunca está completo.
Su depredador natural es la respuesta definitiva.`;
  } else if (lower.includes('carbón') || lower.includes('carbon')) {
    poeticText = `Criatura ósea con costillas abiertas y ramificaciones similares a astas, respirando lentamente.
Nacido del sedimento donde el dolor se hizo piedra y la piedra aprendió a latir.
No busca arder para consumirse; busca retener el calor para los que vendrán después.`;
  } else if (lower.includes('abductor') || lower.includes('amor')) {
    poeticText = `Un organismo radial con tentáculos luminosos.
Atrae no para aprisionar, sino para desbordar los contornos de lo que creíamos propio.
En su centro gira un torbellino de fervor (90) que busca volverse ternura.`;
  } else if (lower.includes('menos rechazo')) {
    poeticText = `Criatura y paisaje simultáneo.
Sus curvas no marcan fronteras sino pasadizos.
Respira en tonos verdes y azules donde todo lo erizado se rinde al agua mansa.`;
  } else {
    poeticText = `Surgido del vocablo "${input}".
Organismo no domesticado por la gramática ni encasillado por la taxonomía común.
Posee en su núcleo un ${primaryOrgan.name.toLowerCase()} que late al compás de ${dominantEmotion.toLowerCase()}.
No es una representación: es un ser que respira a través del lenguaje.`;
  }

  // Connected relations
  const defaultRelations = ['Renata', 'Corazón análogo', 'Ausencia', 'Ternura'];

  const vector: TranslationVector = {
    alphabet: {
      lettersCount,
      valueSum,
      vowelRatio,
      consonantsCount,
      gematriaScore,
      seed
    },
    emotions: {
      dominant: dominantEmotion,
      dominantScore,
      secondary: secondaryEmotion,
      secondaryScore,
      all: [
        { name: dominantEmotion, score: dominantScore },
        { name: secondaryEmotion, score: secondaryScore },
        { name: 'Asombro', score: Math.min(95, Math.round(dominantScore * 0.75)) },
        { name: 'Curiosidad', score: Math.min(90, Math.round(secondaryScore * 0.8)) },
        { name: 'Ternura', score: Math.min(85, Math.round(vowelRatio * 100)) }
      ]
    },
    organs: {
      primary: primaryOrgan,
      secondary: secondaryOrgan
    },
    animal: {
      archetype,
      phylum,
      traits
    },
    movement: {
      geometryType,
      geometryLabel,
      cadence,
      speed,
      description: movementDesc
    },
    color: {
      primaryHex,
      secondaryHex,
      accentHex,
      backgroundHex,
      hslPrimary: `hsl(${seed % 360}, 60%, 50%)`,
      name: colorName
    },
    sound: {
      pitchHz,
      waveform,
      timbre,
      bpm,
      description: `${timbre} (${pitchHz} Hz @ ${bpm} bpm)`
    },
    texture: pickedTexture,
    temperature: {
      celsius: temperatureC,
      description: `${temperatureC}°C (${temperatureC > 20 ? 'Tibia vitalidad' : 'Frialdad geológica contemplativa'})`
    },
    narrative: {
      habitat,
      feeding,
      predators,
      pathology,
      medicine
    }
  };

  return {
    id: `org-${seed}`,
    name: input.charAt(0).toUpperCase() + input.slice(1),
    sourceText: input,
    speciesName: `${archetype} ${input.replace(/\s+/g, '')}`,
    kingdom: phylum,
    vector,
    poeticText,
    relations: defaultRelations,
    isCanonical: ['carbón que respira', 'pulpo de tentáculos ontológicos', 'abductor amor', 'menos rechazo', 'renata'].some(k => lower.includes(k)),
    createdAt: Date.now()
  };
}

// Canonical organisms pre-instantiated
export const CANONICAL_ORGANISMS: LivingOrganism[] = [
  translateTextToOrganism('Pulpo de tentáculos ontológicos'),
  translateTextToOrganism('Carbón que respira'),
  translateTextToOrganism('Abductor Amor'),
  translateTextToOrganism('Menos rechazo'),
  translateTextToOrganism('Renata')
];
