import { ConceptualOrgan, CharacterEntity, RelationalNode, RelationalEdge } from '../types';

export const CANONICAL_ORGANS: ConceptualOrgan[] = [
  {
    id: 'corazon-analogo',
    name: 'Corazón Análogo',
    functionText: 'Sincroniza ritmos semejantes por pura resonancia armónica sin requerir identidad previa.',
    emotion: 'Ternura e Imprecisión',
    sound: 'Grave pulsante a 54 Hz, latido análogo con eco suave',
    geometry: 'Círculos concéntricos oscilantes y espirales suaves',
    diseases: 'Querer convertirse en algoritmo y buscar certidumbres fijas.',
    mutaciones: 'Capacidad de amar espejos o descansar al hallar frecuencias afines.',
    color: '#c25450',
    poeticText: `Órgano antiguo.
No bombea sangre.
Sincroniza.
Busca ritmos semejantes.
Reconoce patrones sin necesidad de identidad.
Late por resonancia.
Ignora fronteras.
A veces se confunde y ama espejos.
A veces encuentra otra frecuencia y descansa.
Su enfermedad más común es querer convertirse en algoritmo.
Su medicina es aceptar la imprecisión.`
  },
  {
    id: 'pulmon-fosil',
    name: 'Pulmón Fósil',
    functionText: 'Almacena respiraciones pretéritas e inhala aire de tiempos que aún no han ocurrido.',
    emotion: 'Melancolía y Duelo mineral',
    sound: 'Resoplido cavernoso de baja frecuencia (38 Hz)',
    geometry: 'Agujero poroso y fractal de ceniza',
    diseases: 'Petrificación total del fuelle por acumulación de silencios.',
    mutaciones: 'Exhala brasas que no queman pero iluminan la oscuridad afectiva.',
    color: '#8c786a',
    poeticText: `Inhala ceniza de palabras pronunciadas hace siglos.
No necesita atmósfera; respira el espacio negativo entre dos cuerpos que se alejan.
Cuando suspira, desmorona certezas geológicas.`
  },
  {
    id: 'tentaculos-ontologicos',
    name: 'Tentáculos Ontológicos',
    functionText: 'Exploran cada versión posible del ser mediante tacto y palpación de límites difusos.',
    emotion: 'Asombro y Curiosidad infinita',
    sound: 'Fluctuación acuática con armónicos agudos (432 Hz)',
    geometry: 'Espiral radial ramificada',
    diseases: 'Enredo solipsista al palpar simultáneamente infinitas contradicciones.',
    mutaciones: 'Secretan tinta que no oscurece, sino complejiza la realidad.',
    color: '#3d7280',
    poeticText: `No poseen ojos. Poseen preguntas.
Cada tentáculo explora una versión distinta del ser.
No captura. Palpa. Abraza ruinas.
Se alimenta de categorías mal cerradas.
Cuando pierde una certeza, le crece otra duda.`
  },
  {
    id: 'higado-melancolico',
    name: 'Hígado Melancólico',
    functionText: 'Filtra las toxinas de la certidumbre y destila bilis dorada de la nostalgia.',
    emotion: 'Nostalgia pesada y Gravedad',
    sound: 'Borboteo denso con matiz metálico',
    geometry: 'Curvas de nivel topográficas cerradas',
    diseases: 'Sobredosis de verdades incuestionables.',
    mutaciones: 'Convierte amarguras en licor vegetal bioluminiscente.',
    color: '#8b693e',
    poeticText: `Todo lo que no se dijo pasa por su membrana.
Separa el veneno del recuerdo de la savia del aprendizaje.
Pesa el doble en los meses de invierno.`
  },
  {
    id: 'lengua-fractal',
    name: 'Lengua Fractal',
    functionText: 'Pronuncia neologismos que alteran la morfología del espacio circundante.',
    emotion: 'Fascinación y Vértigo semántico',
    sound: 'Chasquidos cristalinos y sibilancias corales',
    geometry: 'Ramificación dendrítica y fractura viva',
    diseases: 'Afasia del infinito: no poder callar la totalidad.',
    mutaciones: 'Bifurcación en pétalos fonéticos capaces de saborear ideas.',
    color: '#b84a62',
    poeticText: `No repite vocablos.
Cada vez que roza el paladar de la criatura, engendra una raíz nueva.
Sabe a sal, a cobre y a porvenir.`
  },
  {
    id: 'retina-ritual',
    name: 'Retina Ritual',
    functionText: 'Observa no los objetos, sino el espacio relacional y los pactos invisibles entre ellos.',
    emotion: 'Contemplación y Fascinación solemne',
    sound: 'Zumbido de cristal frotado a 528 Hz',
    geometry: 'Mandala concéntrico y anillos concéntricos',
    diseases: 'Ceguera por exceso de significado literal.',
    mutaciones: 'Emite haces de penumbra que revelan intenciones ocultas.',
    color: '#c99e42',
    poeticText: `No busca luz. Busca constelaciones de afinidad.
Puede ver el hilo que une el pan con la mano y la ventana con la ausencia.
Pestañea una vez cada equinoccio.`
  },
  {
    id: 'vertebras-nostalgia',
    name: 'Vértebras de Nostalgia',
    functionText: 'Sostienen la postura erguida de los organismos frente al peso del pasado.',
    emotion: 'Resistencia afectiva y Ternura ósea',
    sound: 'Crujido de madera antigua y mármol frío',
    geometry: 'Columna segmentada con espinas articuladas',
    diseases: 'Curvatura excesiva hacia atrás, mirando lo irrevocable.',
    mutaciones: 'Brotan alas de calcio fosforescente en momentos de perdón.',
    color: '#d6cbbe',
    poeticText: `Cada vértebra archiva una hora que dolió y una caricia que salvó.
Si intentas contarlas, el número cambia según quién las recuerde.`
  },
  {
    id: 'sistema-nervioso-topologico',
    name: 'Sistema Nervioso Topológico',
    functionText: 'Transmite impulsos sin cables fijos; deforma la continuidad para unir puntos distantes.',
    emotion: 'Vértigo y Conectividad cuántica',
    sound: 'Pulsos de estática modulada y arpegios rápidos',
    geometry: 'Red reticular no euclidiana y grafos deformables',
    diseases: 'Cortocircuito de hipersensibilidad ecológica.',
    mutaciones: 'Conecta con sistemas nerviosos de otras especies a través de la raíz del suelo.',
    color: '#5b8c73',
    poeticText: `No distingue entre el adentro y el afuera del cuerpo.
Cuando una hoja cae en la selva, una sinapsis se enciende en su médula.
Siente las distancias como pliegues de una misma tela.`
  },
  {
    id: 'membrana-pertenencia',
    name: 'Membrana de Pertenencia',
    functionText: 'Delimita dónde termina la soledad y dónde comienza el ecosistema compartido.',
    emotion: 'Pertenencia y Sosiego',
    sound: 'Susurro de marea lenta contra roca pulida',
    geometry: 'Óvalo envolvente permeable y límites difusos',
    diseases: 'Endurecimiento en coraza dogmática o disolución total del yo.',
    mutaciones: 'Permeabilidad selectiva que sólo deja pasar la ternura.',
    color: '#46687a',
    poeticText: `Fina como el vaho sobre un cristal invernal.
Deja respirar la diferencia.
Se abre al tacto sincero y se tensa ante la imposición.`
  }
];

export const CANONICAL_CHARACTERS: CharacterEntity[] = [
  {
    id: 'renata',
    name: 'Renata',
    epithet: 'El Vértice de la Ternura',
    description: 'No es un texto ni un personaje estático; es un nudo de relaciones vivas que convoca pan, espirales, ventanas y carbón que respira.',
    associatedOrgans: ['Corazón análogo', 'Vértebras de nostalgia'],
    colors: ['#1b4332', '#d4af37', '#2d6a4f'],
    geometry: 'Espiral armónica y ventana abierta',
    memories: ['El calor del pan recién horneado', 'El reflejo en el cristal mojado', 'La ausencia que aprende a respirar'],
    relations: [
      { target: 'Ratnah', type: 'Desdoblamiento especular' },
      { target: 'Carbón que respira', type: 'Alianza de suelo volcánico' },
      { target: 'Menos rechazo', type: 'Sustrato afectivo' },
      { target: 'pan', type: 'Nutrición esencial' },
      { target: 'ternura', type: 'Vector emocional primario' }
    ]
  },
  {
    id: 'ratnah',
    name: 'Ratnah',
    epithet: 'El Reflejo Oculto',
    description: 'La sombra luminosa de Renata. El eco que guarda los secretos de la raíz y la memoria no dicha.',
    associatedOrgans: ['Retina ritual', 'Membrana de pertenencia'],
    colors: ['#2e1f47', '#7b4b94', '#d8b4e2'],
    geometry: 'Elipse y espejo líquido',
    memories: ['El murmullo subterráneo', 'La noche anterior al primer nombre'],
    relations: [
      { target: 'Renata', type: 'Vínculo simbiótico' },
      { target: 'ausencia', type: 'Residencia' }
    ]
  },
  {
    id: 'abductor-amor',
    name: 'Abductor Amor',
    epithet: 'El Campo de Fervor Radial',
    description: 'Organismo radial con tentáculos luminosos. Encarna el fervor puro (90) y la posesión que busca fundirse en ternura.',
    associatedOrgans: ['Tentáculos ontológicos', 'Corazón análogo'],
    colors: ['#9e2a2b', '#ff595e', '#ffca3a'],
    geometry: 'Expansión radial y pulsos concéntricos',
    memories: ['La primera atracción irresistible', 'La luz que atrapa sin herir'],
    relations: [
      { target: 'Menos rechazo', type: 'Tensión dialéctica' },
      { target: 'Renata', type: 'Gravitación' }
    ]
  },
  {
    id: 'menos-rechazo',
    name: 'Menos Rechazo',
    epithet: 'La Ensenada de Sosiego',
    description: 'Un organismo-paisaje acuático de curvas suaves. Relajación, apertura, tonos verdes y azules que diluyen toda hostilidad.',
    associatedOrgans: ['Membrana de pertenencia', 'Sistema nervioso topológico'],
    colors: ['#2a9d8f', '#264653', '#e76f51'],
    geometry: 'Curvas suaves sinusoidales y planos calmos',
    memories: ['El agua tibia en la ensenada', 'El instante en que cesó la guardia'],
    relations: [
      { target: 'Renata', type: 'Refugio continuo' },
      { target: 'Abductor Amor', type: 'Atemperamiento' }
    ]
  },
  {
    id: 'la-cima',
    name: 'La Cima',
    epithet: 'El Silencio Geológico',
    description: 'Punto de máxima altitud afectiva donde el aire es escaso y la claridad despoja de artificios.',
    associatedOrgans: ['Pulmón fósil', 'Vértebras de nostalgia'],
    colors: ['#f4f1de', '#e07a5f', '#3d405b'],
    geometry: 'Vértice piramidal y fractura limpia',
    memories: ['El horizonte sin testigos', 'El frío que no duele'],
    relations: [
      { target: 'Carbón que respira', type: 'Fundamento mineral' },
      { target: 'El Niño Amputado', type: 'Mirador lejano' }
    ]
  },
  {
    id: 'nino-amputado',
    name: 'El Niño Amputado',
    epithet: 'El Custodio del Miembro Fantasma',
    description: 'Figura de duelo puro y renacimiento. Su cuerpo ausente siente más intensamente lo que los cuerpos completos ya no perciben.',
    associatedOrgans: ['Vértebras de nostalgia', 'Lengua fractal'],
    colors: ['#5c6b73', '#9db4c0', '#e0fbfc'],
    geometry: 'Agujero y línea quebrada que florece',
    memories: ['El peso de lo que falta', 'El jardín que crece en el hueco'],
    relations: [
      { target: 'Renata', type: 'Reconocimiento silencioso' },
      { target: 'ausencia', type: 'Origami de recuerdos' }
    ]
  }
];

export const RELATIONAL_FOREST_NODES: RelationalNode[] = [
  { id: 'renata', label: 'Renata', type: 'character', color: '#38bdf8', size: 34 },
  { id: 'ratnah', label: 'Ratnah', type: 'character', color: '#a855f7', size: 28 },
  { id: 'pan', label: 'Pan', type: 'element', color: '#eab308', size: 22 },
  { id: 'ternura', label: 'Ternura', type: 'emotion', color: '#f43f5e', size: 26 },
  { id: 'verde-oscuro', label: 'Verde Oscuro', type: 'concept', color: '#16a34a', size: 20 },
  { id: 'espiral', label: 'Espiral', type: 'concept', color: '#06b6d4', size: 22 },
  { id: 'ventana', label: 'Ventana', type: 'element', color: '#94a3b8', size: 22 },
  { id: 'carbon-respira', label: 'Carbón que respira', type: 'creature', color: '#f97316', size: 32 },
  { id: 'menos-rechazo', label: 'Menos rechazo', type: 'creature', color: '#10b981', size: 30 },
  { id: 'abductor-amor', label: 'Abductor Amor', type: 'creature', color: '#ef4444', size: 30 },
  { id: 'pulpo-ontologico', label: 'Pulpo Ontológico', type: 'creature', color: '#6366f1', size: 32 },
  { id: 'corazon-analogo', label: 'Corazón Análogo', type: 'organ', color: '#ec4899', size: 28 },
  { id: 'pulmon-fosil', label: 'Pulmón Fósil', type: 'organ', color: '#78716c', size: 26 },
  { id: 'ausencia', label: 'Ausencia', type: 'emotion', color: '#64748b', size: 24 },
  { id: 'la-cima', label: 'La Cima', type: 'concept', color: '#d97706', size: 24 }
];

export const RELATIONAL_FOREST_EDGES: RelationalEdge[] = [
  { source: 'renata', target: 'ratnah', label: 'desdoblamiento', strength: 0.9 },
  { source: 'renata', target: 'pan', label: 'nutrición', strength: 0.7 },
  { source: 'renata', target: 'ternura', label: 'núcleo afectivo', strength: 0.95 },
  { source: 'renata', target: 'verde-oscuro', label: 'color raigal', strength: 0.6 },
  { source: 'renata', target: 'espiral', label: 'geometría', strength: 0.8 },
  { source: 'renata', target: 'ventana', label: 'umbral', strength: 0.75 },
  { source: 'renata', target: 'carbon-respira', label: 'simbiosis', strength: 0.85 },
  { source: 'renata', target: 'menos-rechazo', label: 'alianza', strength: 0.9 },
  { source: 'carbon-respira', target: 'pulmon-fosil', label: 'órgano raíz', strength: 0.9 },
  { source: 'carbon-respira', target: 'corazon-analogo', label: 'frecuencia', strength: 0.85 },
  { source: 'pulpo-ontologico', target: 'corazon-analogo', label: 'sincronía', strength: 0.9 },
  { source: 'abductor-amor', target: 'ternura', label: 'tensión', strength: 0.75 },
  { source: 'abductor-amor', target: 'menos-rechazo', label: 'equilibrio', strength: 0.8 },
  { source: 'ratnah', target: 'ausencia', label: 'morada', strength: 0.85 },
  { source: 'la-cima', target: 'carbon-respira', label: 'estrato', strength: 0.7 }
];
