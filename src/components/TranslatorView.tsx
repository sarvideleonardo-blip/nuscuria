import { useEffect, useState } from 'react';
import { LivingOrganism } from '../types';
import { translateTextToOrganism } from '../utils/expandedTranslator';
import OrganismRenderer from './OrganismRenderer';
import { 
  Sparkles, 
  Layers, 
  Compass, 
  Activity, 
  BookMarked, 
  Flame, 
  Thermometer, 
  Music, 
  Plus, 
  Check, 
  ArrowRight
} from 'lucide-react';

interface TranslatorViewProps {
  onSaveToBestiary?: (organism: LivingOrganism) => void;
  savedIds?: string[];
  sourceText?: string;
}

export default function TranslatorView({ onSaveToBestiary, savedIds = [], sourceText }: TranslatorViewProps) {
  const [inputText, setInputText] = useState('Carbón que respira');
  const [currentOrganism, setCurrentOrganism] = useState<LivingOrganism>(() => 
    translateTextToOrganism('Carbón que respira')
  );
  const [activeSubMode, setActiveSubMode] = useState<'organism' | 'vectors' | 'constellation' | 'codex'>('organism');
  const [mutationCount, setMutationCount] = useState(0);

  const presets = [
    'Carbón que respira',
    'Pulpo de tentáculos ontológicos',
    'Abductor Amor',
    'Menos rechazo',
    'Renata',
    'La ausencia florece',
    'Vértebras de nostalgia',
    'Pan y ventana'
  ];

  const handleTranslate = (text: string) => {
    setInputText(text);
    const org = translateTextToOrganism(text);
    setCurrentOrganism(org);
  };

  useEffect(() => {
    if (sourceText !== undefined) {
      setInputText(sourceText);
      setCurrentOrganism(translateTextToOrganism(sourceText));
    }
  }, [sourceText]);

  const handleFeedParadox = () => {
    // Induce a biological poetic mutation in the organism
    const paradoxes = [
      '¿Puede la herida ser la única arquitectura del refugio?',
      'Una certeza que al pronunciarse se convierte en pregunta.',
      'El silencio que pesa más que diez montañas de plomo.',
      'Amar el espejo hasta olvidar la propia cara.',
      'Inhalar el tiempo antes de que haya amanecido.'
    ];
    const picked = paradoxes[mutationCount % paradoxes.length];
    setMutationCount(prev => prev + 1);

    // Re-synthesize with mutated seed
    const mutated = translateTextToOrganism(`${currentOrganism.sourceText} (${mutationCount + 1})`);
    mutated.poeticText += `\n\n[MUTACIÓN POR PARADOJA]: "${picked}"`;
    setCurrentOrganism(mutated);
  };

  const isSaved = savedIds.includes(currentOrganism.id);

  const pipelineSteps = [
    { label: 'Letras', val: `${currentOrganism.vector.alphabet.lettersCount}` },
    { label: 'Valores', val: `Σ${currentOrganism.vector.alphabet.valueSum}` },
    { label: 'Geometría', val: currentOrganism.vector.movement.geometryLabel.split(' ')[0] },
    { label: 'Emociones', val: `${currentOrganism.vector.emotions.dominant} (${currentOrganism.vector.emotions.dominantScore}%)` },
    { label: 'Órganos', val: currentOrganism.vector.organs.primary.name },
    { label: 'Animalidad', val: currentOrganism.vector.animal.archetype.split(' ')[0] },
    { label: 'Sonido', val: `${currentOrganism.vector.sound.pitchHz}Hz` },
    { label: 'Color', val: currentOrganism.vector.color.name.split(' ')[0] },
    { label: 'Organismo', val: currentOrganism.name }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Introduction Card */}
      <div className="bg-[#11131a] border border-[#232938] rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono-code text-[#c99e42] uppercase tracking-wider px-2 py-0.5 rounded bg-[#272115] border border-[#785b24]/40">
                Sección I
              </span>
              <h2 className="font-cinzel text-xl md:text-2xl font-bold tracking-wide text-[#f1f5f9]">
                El Traductor Expandido
              </h2>
            </div>
            <p className="text-sm text-[#94a3b8] font-garamond max-w-2xl leading-relaxed">
              Introduce cualquier palabra, nombre propio o verso. El motor no busca ilustrar una idea, sino desencadenar su biología latente a través de capas simultáneas de traducción: de la letra al órgano, del valor al sonido, de la emoción a la criatura viva.
            </p>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-1.5 max-w-md">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => handleTranslate(preset)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-mono-code transition-all ${
                  inputText === preset
                    ? 'bg-[#c99e42]/20 text-[#f8e3a1] border-[#c99e42]/60'
                    : 'bg-[#181d28] text-[#94a3b8] border-[#293245] hover:text-[#e2e8f0] hover:border-[#3d4963]'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              id="translator-input-field"
              type="text"
              value={inputText}
              onChange={(e) => handleTranslate(e.target.value)}
              placeholder="Escribe una palabra o verso (ej. Carbón que respira, Renata, La ausencia...)"
              className="w-full px-4 py-3 bg-[#0a0c10] border border-[#2f374a] rounded-xl text-[#f1f5f9] text-base placeholder-[#64748b] focus:outline-none focus:border-[#c99e42] transition-colors font-garamond italic"
            />
            {inputText && (
              <span className="absolute right-3.5 top-3.5 text-xs font-mono-code text-[#64748b]">
                {inputText.length} caracteres
              </span>
            )}
          </div>

          {onSaveToBestiary && (
            <button
              onClick={() => onSaveToBestiary(currentOrganism)}
              disabled={isSaved}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-cinzel text-xs tracking-wider transition-all shadow-md ${
                isSaved
                  ? 'bg-[#1e293b] text-[#94a3b8] cursor-default border border-[#334155]'
                  : 'bg-gradient-to-r from-[#c99e42] to-[#b3832c] text-[#0f1117] font-bold hover:brightness-110'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>En el Bestiario</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Registrar en Bestiario</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Translation Layer Pipeline Ribbon */}
        <div className="mt-6 pt-4 border-t border-[#232938]">
          <div className="text-[11px] font-mono-code uppercase tracking-widest text-[#78849c] mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#c99e42]" />
            <span>Capas de Traducción Activas</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
            {pipelineSteps.map((step, i) => (
              <div
                key={step.label}
                className="bg-[#090b10] border border-[#1e2535] rounded-lg p-2 text-center transition-all hover:border-[#38bdf8]/40"
              >
                <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-mono-code">
                  {step.label}
                </div>
                <div className="text-xs font-semibold text-[#e2e8f0] truncate mt-0.5" title={step.val}>
                  {step.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace: Organism + Dossier Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Living Organism */}
        <div className="lg:col-span-5 space-y-4">
          <OrganismRenderer
            organism={currentOrganism}
            onFeedParadox={handleFeedParadox}
            size={380}
          />

          {/* Submode Switcher */}
          <div className="flex items-center justify-center bg-[#131620] p-1 rounded-xl border border-[#232938]">
            <button
              onClick={() => setActiveSubMode('organism')}
              className={`flex-1 py-1.5 text-xs font-mono-code rounded-lg transition-all ${
                activeSubMode === 'organism'
                  ? 'bg-[#232b3b] text-[#f8fafc] border border-[#374259]'
                  : 'text-[#94a3b8] hover:text-[#e2e8f0]'
              }`}
            >
              Ficha & Anatomía
            </button>
            <button
              onClick={() => setActiveSubMode('vectors')}
              className={`flex-1 py-1.5 text-xs font-mono-code rounded-lg transition-all ${
                activeSubMode === 'vectors'
                  ? 'bg-[#232b3b] text-[#f8fafc] border border-[#374259]'
                  : 'text-[#94a3b8] hover:text-[#e2e8f0]'
              }`}
            >
              Vectores Multicapa
            </button>
            <button
              onClick={() => setActiveSubMode('constellation')}
              className={`flex-1 py-1.5 text-xs font-mono-code rounded-lg transition-all ${
                activeSubMode === 'constellation'
                  ? 'bg-[#232b3b] text-[#f8fafc] border border-[#374259]'
                  : 'text-[#94a3b8] hover:text-[#e2e8f0]'
              }`}
            >
              Constelación
            </button>
            <button
              onClick={() => setActiveSubMode('codex')}
              className={`flex-1 py-1.5 text-xs font-mono-code rounded-lg transition-all ${
                activeSubMode === 'codex'
                  ? 'bg-[#232b3b] text-[#f8fafc] border border-[#374259]'
                  : 'text-[#94a3b8] hover:text-[#e2e8f0]'
              }`}
            >
              Códice Poético
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Biological / Ontological Manifest */}
        <div className="lg:col-span-7 bg-[#11131a] border border-[#232938] rounded-2xl p-5 md:p-7 shadow-xl space-y-6">
          
          {activeSubMode === 'organism' && (
            <div className="space-y-6 animate-fade-in">
              {/* Header Specimen info */}
              <div className="border-b border-[#252c3c] pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code text-[#c99e42] tracking-widest uppercase">
                    Ficha Bio-Ontológica
                  </span>
                  <span className="text-xs font-mono-code text-[#64748b]">
                    Gematría: {currentOrganism.vector.alphabet.gematriaScore}
                  </span>
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-[#f8fafc] tracking-wide mt-1">
                  {currentOrganism.name}
                </h3>
                <p className="text-sm font-garamond italic text-[#94a3b8] mt-0.5">
                  {currentOrganism.speciesName} — Reino: {currentOrganism.kingdom}
                </p>
              </div>

              {/* Poetic quote block */}
              <div className="p-4 rounded-xl bg-[#090b10] border-l-2 border-[#c99e42] border-y border-r border-[#1e2535]">
                <p className="font-garamond italic text-base text-[#d8dde8] leading-relaxed whitespace-pre-line">
                  {currentOrganism.poeticText}
                </p>
              </div>

              {/* Grid of Ontological Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organs */}
                <div className="p-3.5 rounded-xl bg-[#0d1017] border border-[#222938]">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#38bdf8] uppercase tracking-wider mb-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Órgano Principal</span>
                  </div>
                  <div className="text-sm font-cinzel font-bold text-[#f1f5f9]">
                    {currentOrganism.vector.organs.primary.name}
                  </div>
                  <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2 font-garamond">
                    {currentOrganism.vector.organs.primary.functionText}
                  </p>
                  <div className="mt-2 text-[11px] font-mono-code text-[#64748b]">
                    Órgano secundario: {currentOrganism.vector.organs.secondary.name}
                  </div>
                </div>

                {/* Feeding */}
                <div className="p-3.5 rounded-xl bg-[#0d1017] border border-[#222938]">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#f97316] uppercase tracking-wider mb-2">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Alimentación</span>
                  </div>
                  <ul className="text-xs text-[#cbd5e1] space-y-1 font-garamond">
                    {currentOrganism.vector.narrative.feeding.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Predators */}
                <div className="p-3.5 rounded-xl bg-[#0d1017] border border-[#222938]">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#ef4444] uppercase tracking-wider mb-2">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Depredadores Naturales</span>
                  </div>
                  <ul className="text-xs text-[#cbd5e1] space-y-1 font-garamond">
                    {currentOrganism.vector.narrative.predators.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Habitat */}
                <div className="p-3.5 rounded-xl bg-[#0d1017] border border-[#222938]">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#10b981] uppercase tracking-wider mb-2">
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Hábitat y Suelo</span>
                  </div>
                  <p className="text-xs text-[#cbd5e1] font-garamond leading-relaxed">
                    {currentOrganism.vector.narrative.habitat}
                  </p>
                  <div className="mt-2 text-[11px] font-mono-code text-[#64748b]">
                    Textura: {currentOrganism.vector.texture.name}
                  </div>
                </div>
              </div>

              {/* Medical / Philosophical Pathology */}
              <div className="p-4 rounded-xl bg-[#141722] border border-[#283246] flex flex-col sm:flex-row gap-4 justify-between">
                <div>
                  <span className="text-[11px] font-mono-code text-[#ef4444] uppercase tracking-wider">
                    Patología Común
                  </span>
                  <p className="text-xs text-[#cbd5e1] font-garamond mt-0.5">
                    {currentOrganism.vector.narrative.pathology}
                  </p>
                </div>
                <div className="sm:border-l sm:border-[#283246] sm:pl-4">
                  <span className="text-[11px] font-mono-code text-[#10b981] uppercase tracking-wider">
                    Medicina Ontológica
                  </span>
                  <p className="text-xs text-[#cbd5e1] font-garamond mt-0.5">
                    {currentOrganism.vector.narrative.medicine}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSubMode === 'vectors' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-[#252c3c] pb-3">
                <h4 className="font-cinzel text-lg font-bold text-[#f1f5f9]">
                  Desglose de Vectores Simultáneos
                </h4>
                <p className="text-xs text-[#8f96a3] font-garamond">
                  El valor de una palabra no es sólo alfabético; engloba múltiples dimensiones físicas y afectivas calculadas sincrónicamente.
                </p>
              </div>

              <div className="space-y-3">
                {/* Alphabet metric bar */}
                <div className="p-3 bg-[#0d1017] rounded-xl border border-[#202737]">
                  <div className="flex justify-between text-xs font-mono-code text-[#94a3b8] mb-1">
                    <span>1. Vector Alfabético</span>
                    <span>Σ = {currentOrganism.vector.alphabet.valueSum} (Gematría {currentOrganism.vector.alphabet.gematriaScore})</span>
                  </div>
                  <div className="w-full bg-[#1a202c] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#c99e42] h-full rounded-full"
                      style={{ width: `${Math.min(100, currentOrganism.vector.alphabet.valueSum % 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono-code text-[#64748b] mt-1">
                    <span>{currentOrganism.vector.alphabet.lettersCount} letras ({currentOrganism.vector.alphabet.consonantsCount} consonantes / ratio vocálico {currentOrganism.vector.alphabet.vowelRatio})</span>
                    <span>Semilla: #{currentOrganism.vector.alphabet.seed.toString().slice(-6)}</span>
                  </div>
                </div>

                {/* Emotional vector breakdown */}
                <div className="p-3 bg-[#0d1017] rounded-xl border border-[#202737]">
                  <span className="text-xs font-mono-code text-[#94a3b8] block mb-2">
                    2. Vector Emocional Ponderado
                  </span>
                  <div className="space-y-2">
                    {currentOrganism.vector.emotions.all.map((emo) => (
                      <div key={emo.name}>
                        <div className="flex justify-between text-xs font-mono-code mb-0.5">
                          <span className="text-[#cbd5e1]">{emo.name}</span>
                          <span className="text-[#38bdf8]">{emo.score}%</span>
                        </div>
                        <div className="w-full bg-[#1a202c] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#38bdf8] to-[#c99e42] h-full rounded-full"
                            style={{ width: `${emo.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sonic and Physical vectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#0d1017] rounded-xl border border-[#202737]">
                    <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#38bdf8] mb-1">
                      <Music className="w-3.5 h-3.5" />
                      <span>3. Vector Sonoro</span>
                    </div>
                    <div className="text-sm font-semibold text-[#f1f5f9]">
                      {currentOrganism.vector.sound.pitchHz} Hz — {currentOrganism.vector.sound.waveform}
                    </div>
                    <p className="text-xs text-[#8f96a3] mt-0.5 font-garamond">
                      {currentOrganism.vector.sound.timbre} ({currentOrganism.vector.sound.bpm} bpm)
                    </p>
                  </div>

                  <div className="p-3 bg-[#0d1017] rounded-xl border border-[#202737]">
                    <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#f97316] mb-1">
                      <Thermometer className="w-3.5 h-3.5" />
                      <span>4. Vector Térmico & Textura</span>
                    </div>
                    <div className="text-sm font-semibold text-[#f1f5f9]">
                      {currentOrganism.vector.temperature.description}
                    </div>
                    <p className="text-xs text-[#8f96a3] mt-0.5 font-garamond">
                      {currentOrganism.vector.texture.name}: {currentOrganism.vector.texture.description}
                    </p>
                  </div>
                </div>

                {/* Affective Movement */}
                <div className="p-3 bg-[#0d1017] rounded-xl border border-[#202737]">
                  <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#a855f7] mb-1">
                    <Compass className="w-3.5 h-3.5" />
                    <span>5. Vector Geometría Afectiva</span>
                  </div>
                  <div className="text-sm font-semibold text-[#f1f5f9]">
                    {currentOrganism.vector.movement.geometryLabel}
                  </div>
                  <p className="text-xs text-[#8f96a3] mt-0.5 font-garamond">
                    {currentOrganism.vector.movement.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSubMode === 'constellation' && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#252c3c] pb-3">
                <h4 className="font-cinzel text-lg font-bold text-[#f1f5f9]">
                  Constelación de Letras y Puntos Celestes
                </h4>
                <p className="text-xs text-[#8f96a3] font-garamond">
                  El texto como cielo nocturno. Cada carácter proyecta una estrella enlazada por líneas de afinidad fonética.
                </p>
              </div>

              {/* Interactive Constellation SVG Map */}
              <div className="w-full h-72 bg-[#090b10] rounded-xl border border-[#1e2535] relative overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 500 280" className="w-full h-full">
                  {/* Faint celestial grid lines */}
                  <circle cx="250" cy="140" r="100" fill="none" stroke="#232a3d" strokeDasharray="3 4" />
                  <circle cx="250" cy="140" r="60" fill="none" stroke="#232a3d" strokeDasharray="2 3" />
                  <line x1="50" y1="140" x2="450" y2="140" stroke="#1c2233" />
                  <line x1="250" y1="30" x2="250" y2="250" stroke="#1c2233" />

                  {/* Star nodes based on string characters */}
                  {currentOrganism.sourceText.split('').map((char: string, idx: number, arr: string[]) => {
                    const angle = (idx / Math.max(1, arr.length)) * 2 * Math.PI;
                    const rDist = 40 + ((idx * 29 + currentOrganism.vector.alphabet.seed) % 85);
                    const cx = 250 + Math.cos(angle) * rDist;
                    const cy = 140 + Math.sin(angle) * rDist;

                    // Next star point for connecting line
                    const nextAngle = ((idx + 1) / Math.max(1, arr.length)) * 2 * Math.PI;
                    const nextR = 40 + (((idx + 1) * 29 + currentOrganism.vector.alphabet.seed) % 85);
                    const nx = 250 + Math.cos(nextAngle) * nextR;
                    const ny = 140 + Math.sin(nextAngle) * nextR;

                    return (
                      <g key={idx}>
                        <line
                          x1={cx}
                          y1={cy}
                          x2={nx}
                          y2={ny}
                          stroke={currentOrganism.vector.color.primaryHex}
                          strokeWidth="1.2"
                          strokeOpacity="0.5"
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r={char === ' ' ? 2 : 4.5}
                          fill={currentOrganism.vector.color.accentHex}
                          className="animate-pulse"
                        />
                        {char !== ' ' && (
                          <text
                            x={cx + 7}
                            y={cy + 4}
                            fill="#e2e8f0"
                            fontSize="11"
                            fontFamily="JetBrains Mono"
                            opacity="0.85"
                          >
                            {char.toUpperCase()}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {activeSubMode === 'codex' && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#252c3c] pb-3">
                <h4 className="font-cinzel text-lg font-bold text-[#f1f5f9]">
                  Manuscrito Poético de Nuscuria
                </h4>
                <p className="text-xs text-[#8f96a3] font-garamond">
                  Registro lírico de la entidad para el archivo general de la biblioteca.
                </p>
              </div>

              <div className="p-6 bg-[#0c0d12] border border-[#2d281f] rounded-xl text-center space-y-4 shadow-inner">
                <span className="font-cinzel text-xs text-[#d4af37] tracking-[0.3em] uppercase block">
                  — Canto Ontológico —
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#f8fafc]">
                  «{currentOrganism.name}»
                </h3>
                <div className="w-16 h-px bg-[#c99e42]/40 mx-auto" />
                <p className="font-garamond italic text-lg text-[#cbd5e1] leading-relaxed max-w-xl mx-auto whitespace-pre-line">
                  {currentOrganism.poeticText}
                </p>
                <div className="pt-4 text-xs font-mono-code text-[#64748b]">
                  {currentOrganism.speciesName} · Resonando a {currentOrganism.vector.sound.pitchHz} Hz
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
