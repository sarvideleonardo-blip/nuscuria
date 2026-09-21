import { useState } from 'react';
import { LivingOrganism } from '../types';
import OrganismRenderer from './OrganismRenderer';
import { Volume2, Sparkles, Filter, Plus, BookOpen, ExternalLink, ShieldAlert, Heart, Compass } from 'lucide-react';
import { bioAudio } from '../utils/audioSynthesizer';

interface BestiaryViewProps {
  organisms: LivingOrganism[];
  onSelectOrganism: (organism: LivingOrganism) => void;
  onNavigateToTranslator: () => void;
}

export default function BestiaryView({ organisms, onSelectOrganism, onNavigateToTranslator }: BestiaryViewProps) {
  const [selectedOrganism, setSelectedOrganism] = useState<LivingOrganism | null>(organisms[0] || null);
  const [filterTag, setFilterTag] = useState<string>('all');

  const tags = ['all', 'Canónicas', 'Cefalópodos', 'Minerales', 'Radiales', 'Acuáticos'];

  const filtered = organisms.filter((org) => {
    if (filterTag === 'all') return true;
    if (filterTag === 'Canónicas') return org.isCanonical;
    if (filterTag === 'Cefalópodos') return org.vector.animal.archetype.toLowerCase().includes('cefalópodo') || org.vector.animal.archetype.toLowerCase().includes('pulpo');
    if (filterTag === 'Minerales') return org.vector.animal.archetype.toLowerCase().includes('mineral') || org.kingdom.toLowerCase().includes('lito');
    if (filterTag === 'Radiales') return org.vector.movement.geometryType === 'expansion' || org.vector.animal.archetype.toLowerCase().includes('radial');
    if (filterTag === 'Acuáticos') return org.vector.animal.archetype.toLowerCase().includes('acuático') || org.vector.animal.archetype.toLowerCase().includes('medusa');
    return true;
  });

  const handleHearPulse = (org: LivingOrganism) => {
    bioAudio.playOrganismSound(org.vector.sound.pitchHz, org.vector.sound.waveform, org.vector.sound.bpm);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Bestiary Header */}
      <div className="bg-[#11131a] border border-[#232938] rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-code text-[#c99e42] uppercase tracking-wider px-2 py-0.5 rounded bg-[#272115] border border-[#785b24]/40">
              Sección II
            </span>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold tracking-wide text-[#f1f5f9]">
              El Bestiario Emergente
            </h2>
          </div>
          <p className="text-sm text-[#94a3b8] font-garamond max-w-2xl leading-relaxed">
            «Cada entidad tiene ficha». Un códice de organismos vivientes nacidos del lenguaje donde las emociones, los órganos, las ideas y los animales se cruzan libremente.
          </p>
        </div>

        <button
          onClick={onNavigateToTranslator}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c99e42] to-[#b3832c] text-[#0f1117] font-cinzel font-bold text-xs tracking-wider shadow-md hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Traducir Nueva Entidad</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-3.5 h-3.5 text-[#64748b] ml-1 flex-shrink-0" />
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all whitespace-nowrap border ${
              filterTag === tag
                ? 'bg-[#242b3b] text-[#f8fafc] border-[#38bdf8]/50 shadow-sm'
                : 'bg-[#11141d] text-[#94a3b8] border-[#222736] hover:text-[#e2e8f0]'
            }`}
          >
            {tag === 'all' ? 'Todas las Entidades' : tag}
          </button>
        ))}
      </div>

      {/* Main Grid: Specimen Cards + Selected Specimen Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Specimen Index Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((org) => {
            const isSelected = selectedOrganism?.id === org.id;
            return (
              <div
                key={org.id}
                onClick={() => setSelectedOrganism(org)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#151924] border-[#c99e42] shadow-lg shadow-[#c99e42]/5'
                    : 'bg-[#0f1118] border-[#212738] hover:border-[#38435d] hover:bg-[#131621]'
                }`}
              >
                {/* Visual accent badge */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono-code text-[#64748b] text-[11px]">
                    #{org.vector.alphabet.seed.toString().slice(-4)}
                  </span>
                  <span 
                    className="text-[10px] font-mono-code px-2 py-0.5 rounded border"
                    style={{ 
                      borderColor: `${org.vector.color.primaryHex}40`,
                      color: org.vector.color.primaryHex,
                      backgroundColor: `${org.vector.color.primaryHex}15`
                    }}
                  >
                    {org.vector.animal.archetype.split(' ')[0]}
                  </span>
                </div>

                {/* Name and Kingdom */}
                <h3 className="font-cinzel text-base font-bold text-[#f1f5f9] tracking-wide group-hover:text-[#c99e42] transition-colors">
                  {org.name}
                </h3>
                <p className="text-xs text-[#8f96a3] font-garamond italic mt-0.5 line-clamp-1">
                  {org.speciesName}
                </p>

                {/* Primary Organ & Dominant Emotion */}
                <div className="mt-3 pt-2.5 border-t border-[#1e2434] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#cbd5e1]">
                    <span className="flex items-center gap-1 text-[#94a3b8] text-[11px] font-mono-code">
                      <Heart className="w-3 h-3 text-[#f43f5e]" />
                      Órgano:
                    </span>
                    <span className="font-medium text-right truncate max-w-[140px]">
                      {org.vector.organs.primary.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#cbd5e1]">
                    <span className="flex items-center gap-1 text-[#94a3b8] text-[11px] font-mono-code">
                      <Compass className="w-3 h-3 text-[#38bdf8]" />
                      Emoción:
                    </span>
                    <span className="font-medium">
                      {org.vector.emotions.dominant} ({org.vector.emotions.dominantScore}%)
                    </span>
                  </div>
                </div>

                {/* Audio quick button */}
                <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-[#1a1f2d]">
                  <span className="text-[11px] font-mono-code text-[#64748b]">
                    {org.vector.sound.pitchHz} Hz · {org.vector.movement.cadence.split(' ')[0]}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHearPulse(org);
                    }}
                    className="p-1 rounded-md bg-[#1a202c] hover:bg-[#2d3748] text-[#38bdf8] transition-colors"
                    title="Escuchar frecuencia sonora"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Specimen Full Inspection Drawer */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          {selectedOrganism ? (
            <div className="space-y-4">
              <OrganismRenderer organism={selectedOrganism} size={360} />

              <div className="bg-[#11131a] border border-[#232938] rounded-2xl p-5 shadow-xl space-y-4">
                <div className="border-b border-[#232938] pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-cinzel text-[#d4af37] tracking-widest uppercase block">
                      Ficha de Especie
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-[#f8fafc]">
                      {selectedOrganism.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => onSelectOrganism(selectedOrganism)}
                    className="flex items-center gap-1 text-xs font-mono-code text-[#38bdf8] hover:underline"
                  >
                    <span>Abrir en Traductor</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Canonical Poetic Fragment */}
                <div className="p-3.5 rounded-xl bg-[#0a0c10] border-l-2 border-[#c99e42] border-y border-r border-[#1e2535]">
                  <p className="font-garamond italic text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-line">
                    {selectedOrganism.poeticText}
                  </p>
                </div>

                {/* Deep Ontological Summary */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1b2130]">
                    <span className="font-mono-code text-[#8f96a3]">Clase & Reino:</span>
                    <span className="text-[#f1f5f9] font-medium">{selectedOrganism.kingdom}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1b2130]">
                    <span className="font-mono-code text-[#8f96a3]">Alimentación:</span>
                    <span className="text-[#f1f5f9] font-medium text-right max-w-[220px] truncate">
                      {selectedOrganism.vector.narrative.feeding.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1b2130]">
                    <span className="font-mono-code text-[#8f96a3]">Depredadores:</span>
                    <span className="text-[#ef4444] font-medium text-right max-w-[220px] truncate">
                      {selectedOrganism.vector.narrative.predators.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1b2130]">
                    <span className="font-mono-code text-[#8f96a3]">Geometría Afectiva:</span>
                    <span className="text-[#38bdf8] font-medium">{selectedOrganism.vector.movement.geometryLabel}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-mono-code text-[#8f96a3]">Sonido & Frecuencia:</span>
                    <span className="text-[#f1f5f9] font-medium">{selectedOrganism.vector.sound.description}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 rounded-2xl bg-[#0f1118] border border-[#212738] text-center text-[#64748b]">
              Selecciona una criatura del códice para examinar su ficha anatómica.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
