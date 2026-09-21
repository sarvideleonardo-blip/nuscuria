import { useState } from 'react';
import { LivingOrganism } from '../types';
import { translateTextToOrganism } from '../utils/expandedTranslator';
import OrganismRenderer from './OrganismRenderer';
import { Shuffle, Plus, ArrowRight, Dna, Sparkles, Check } from 'lucide-react';

interface HybridizerViewProps {
  onSaveToBestiary?: (organism: LivingOrganism) => void;
  savedIds?: string[];
}

export default function HybridizerView({ onSaveToBestiary, savedIds = [] }: HybridizerViewProps) {
  const [parentA, setParentA] = useState('Carbón que respira');
  const [parentB, setParentB] = useState('Pulpo de tentáculos ontológicos');

  const [hybridOrganism, setHybridOrganism] = useState<LivingOrganism>(() => {
    return generateHybrid('Carbón que respira', 'Pulpo de tentáculos ontológicos');
  });

  const parentSuggestions = [
    'Carbón que respira',
    'Pulpo de tentáculos ontológicos',
    'Abductor Amor',
    'Menos rechazo',
    'Renata',
    'Ratnah',
    'Pulmón fósil',
    'Vértebras de nostalgia'
  ];

  function generateHybrid(textA: string, textB: string): LivingOrganism {
    const orgA = translateTextToOrganism(textA);
    const orgB = translateTextToOrganism(textB);

    const mergedName = `${textA.trim().split(' ')[0]} ${textB.trim().split(' ').slice(-1)[0] || 'Quimera'}`;
    const baseHybrid = translateTextToOrganism(`${textA} y ${textB}`);

    // Fuse primary and secondary organs
    baseHybrid.name = `Quimera: ${mergedName}`;
    baseHybrid.speciesName = `Híbrido [${orgA.vector.animal.archetype} × ${orgB.vector.animal.archetype}]`;
    baseHybrid.kingdom = `${orgA.kingdom} / ${orgB.kingdom}`;
    baseHybrid.vector.organs.primary = orgA.vector.organs.primary;
    baseHybrid.vector.organs.secondary = orgB.vector.organs.primary;

    // Dual sonic resonance
    const fusedHz = Math.round((orgA.vector.sound.pitchHz + orgB.vector.sound.pitchHz) / 2);
    baseHybrid.vector.sound.pitchHz = fusedHz;
    baseHybrid.vector.sound.description = `Armónico binario de ${orgA.vector.sound.pitchHz} Hz y ${orgB.vector.sound.pitchHz} Hz`;

    // Hybrid poem
    baseHybrid.poeticText = `Nacido de la unión imposible entre «${textA}» y «${textB}».
Porta el ${orgA.vector.organs.primary.name.toLowerCase()} de su primer linaje y los ${orgB.vector.organs.primary.name.toLowerCase()} del segundo.
Late a ${fusedHz} Hz en el espacio intermedio donde las palabras dejan de repelerse y aprenden a cohabitar.`;

    return baseHybrid;
  }

  const handleFuse = () => {
    const fused = generateHybrid(parentA, parentB);
    setHybridOrganism(fused);
  };

  const isSaved = savedIds.includes(hybridOrganism.id);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="bg-[#11131a] border border-[#232938] rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-code text-[#c99e42] uppercase tracking-wider px-2 py-0.5 rounded bg-[#272115] border border-[#785b24]/40">
              Sección V
            </span>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold tracking-wide text-[#f1f5f9]">
              El Hibridador de Quimeras
            </h2>
          </div>
          <p className="text-sm text-[#94a3b8] font-garamond max-w-2xl leading-relaxed">
            «Un bestiario donde las emociones, los órganos, las ideas y los animales pudieran cruzarse libremente y producir organismos híbridos imposibles.» Cruza dos palabras o entidades para gestar un ser quimérico con ADN poético compartido.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-code text-[#38bdf8] bg-[#090b10] px-3 py-2 rounded-xl border border-[#262e3f]">
          <Dna className="w-4 h-4 text-[#c99e42]" />
          <span>Fusión Biopoética</span>
        </div>
      </div>

      {/* Cross breeding inputs */}
      <div className="bg-[#0f1118] border border-[#232938] rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          
          {/* Parent A */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-mono-code text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
              <span>Progenitor I (Sustrato)</span>
            </label>
            <input
              type="text"
              value={parentA}
              onChange={(e) => setParentA(e.target.value)}
              placeholder="Primera entidad..."
              className="w-full px-4 py-2.5 bg-[#08090d] border border-[#272f42] rounded-xl text-[#f1f5f9] font-garamond focus:outline-none focus:border-[#38bdf8]"
            />
            <div className="flex flex-wrap gap-1">
              {parentSuggestions.slice(0, 4).map(s => (
                <button
                  key={s}
                  onClick={() => setParentA(s)}
                  className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#161b26] text-[#94a3b8] hover:text-[#e2e8f0] border border-[#22293b]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Fusion Cross Icon & Trigger */}
          <div className="flex justify-center md:col-span-1 py-2">
            <button
              onClick={handleFuse}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#c99e42] to-[#ff595e] text-[#0f1117] flex items-center justify-center font-bold shadow-lg hover:rotate-180 transition-transform duration-500"
              title="Cruzar y engendrar quimera"
            >
              <Shuffle className="w-5 h-5" />
            </button>
          </div>

          {/* Parent B */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-mono-code text-[#f43f5e] uppercase tracking-wider flex items-center gap-1.5">
              <span>Progenitor II (Injerto)</span>
            </label>
            <input
              type="text"
              value={parentB}
              onChange={(e) => setParentB(e.target.value)}
              placeholder="Segunda entidad..."
              className="w-full px-4 py-2.5 bg-[#08090d] border border-[#272f42] rounded-xl text-[#f1f5f9] font-garamond focus:outline-none focus:border-[#f43f5e]"
            />
            <div className="flex flex-wrap gap-1">
              {parentSuggestions.slice(4, 8).map(s => (
                <button
                  key={s}
                  onClick={() => setParentB(s)}
                  className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#161b26] text-[#94a3b8] hover:text-[#e2e8f0] border border-[#22293b]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={handleFuse}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c99e42] to-[#b3832c] text-[#0f1117] font-cinzel font-bold text-xs tracking-wider shadow-md hover:brightness-110 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Engendrar Quimera Híbrida</span>
          </button>
        </div>
      </div>

      {/* Result Chimera Specimen Plate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <OrganismRenderer organism={hybridOrganism} size={380} />
        </div>

        <div className="lg:col-span-7 bg-[#11131a] border border-[#232938] rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-[#252c3c] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-cinzel text-[#d4af37] tracking-widest uppercase block">
                Ficha Quimérica Resultante
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-[#f8fafc] mt-0.5">
                {hybridOrganism.name}
              </h3>
              <p className="text-xs font-garamond italic text-[#94a3b8] mt-0.5">
                {hybridOrganism.speciesName}
              </p>
            </div>

            {onSaveToBestiary && (
              <button
                onClick={() => onSaveToBestiary(hybridOrganism)}
                disabled={isSaved}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-cinzel font-bold tracking-wider transition-all ${
                  isSaved
                    ? 'bg-[#1e293b] text-[#94a3b8] border border-[#334155]'
                    : 'bg-[#242b3b] hover:bg-[#333e54] text-[#f8fafc] border border-[#3f4b66]'
                }`}
              >
                {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5 text-[#d4af37]" />}
                <span>{isSaved ? 'En el Bestiario' : 'Guardar Quimera'}</span>
              </button>
            )}
          </div>

          {/* Hybrid Poetic Fragment */}
          <div className="p-4 rounded-xl bg-[#090b10] border-l-2 border-[#d4af37] border-y border-r border-[#1e2535]">
            <p className="font-garamond italic text-base text-[#cbd5e1] leading-relaxed whitespace-pre-line">
              {hybridOrganism.poeticText}
            </p>
          </div>

          {/* Dual Heritage Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[#0d1017] border border-[#202737]">
              <span className="text-[11px] font-mono-code text-[#38bdf8] uppercase block mb-1">
                Herencia I ({parentA})
              </span>
              <div className="text-sm font-semibold text-[#f1f5f9]">
                {hybridOrganism.vector.organs.primary.name}
              </div>
              <p className="text-xs text-[#94a3b8] font-garamond mt-1">
                {hybridOrganism.vector.organs.primary.functionText}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0d1017] border border-[#202737]">
              <span className="text-[11px] font-mono-code text-[#f43f5e] uppercase block mb-1">
                Herencia II ({parentB})
              </span>
              <div className="text-sm font-semibold text-[#f1f5f9]">
                {hybridOrganism.vector.organs.secondary.name}
              </div>
              <p className="text-xs text-[#94a3b8] font-garamond mt-1">
                {hybridOrganism.vector.organs.secondary.functionText}
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#0d1017] rounded-xl border border-[#202737] flex justify-between text-xs font-mono-code text-[#8f96a3]">
            <span>Frecuencia Síntesis: {hybridOrganism.vector.sound.pitchHz} Hz</span>
            <span>Geometría: {hybridOrganism.vector.movement.geometryLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
