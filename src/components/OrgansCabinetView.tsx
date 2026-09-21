import { useState } from 'react';
import { ConceptualOrgan } from '../types';
import { CANONICAL_ORGANS } from '../data/canonicalData';
import { Volume2, Sparkles, Activity, ShieldAlert, Zap, Compass } from 'lucide-react';
import { bioAudio } from '../utils/audioSynthesizer';

interface OrgansCabinetViewProps {
  onSpawnOrganismWithOrgan?: (organName: string) => void;
}

export default function OrgansCabinetView({ onSpawnOrganismWithOrgan }: OrgansCabinetViewProps) {
  const [selectedOrgan, setSelectedOrgan] = useState<ConceptualOrgan>(CANONICAL_ORGANS[0]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlaySound = (organ: ConceptualOrgan) => {
    let hz = 54;
    let wave: OscillatorType = 'sine';
    let bpm = 48;

    if (organ.id === 'corazon-analogo') {
      hz = 54;
      wave = 'sine';
      bpm = 52;
    } else if (organ.id === 'pulmon-fosil') {
      hz = 38;
      wave = 'triangle';
      bpm = 32;
    } else if (organ.id === 'tentaculos-ontologicos') {
      hz = 432;
      wave = 'sine';
      bpm = 56;
    } else if (organ.id === 'retina-ritual') {
      hz = 528;
      wave = 'sine';
      bpm = 40;
    } else if (organ.id === 'lengua-fractal') {
      hz = 280;
      wave = 'sawtooth';
      bpm = 64;
    } else {
      hz = 120;
      wave = 'triangle';
      bpm = 45;
    }

    if (playingId === organ.id) {
      bioAudio.stop();
      setPlayingId(null);
    } else {
      bioAudio.playOrganismSound(hz, wave, bpm);
      setPlayingId(organ.id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="bg-[#11131a] border border-[#232938] rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-code text-[#c99e42] uppercase tracking-wider px-2 py-0.5 rounded bg-[#272115] border border-[#785b24]/40">
              Sección IV
            </span>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold tracking-wide text-[#f1f5f9]">
              Gabinete de Órganos Conceptuales
            </h2>
          </div>
          <p className="text-sm text-[#94a3b8] font-garamond max-w-2xl leading-relaxed">
            Atlas de la anatomía especulativa de Nuscuria. Cada órgano gobierna una dimensión del ser poético con su propia función, emoción resonante, acústica, geometría, patología y mutación.
          </p>
        </div>

        <div className="text-xs font-mono-code text-[#94a3b8] bg-[#090b10] px-3 py-2 rounded-xl border border-[#262e3f]">
          9 Placas Anatómicas Alquímicas
        </div>
      </div>

      {/* Grid of 9 Anatomical Plates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CANONICAL_ORGANS.map((organ) => {
          const isSelected = selectedOrgan.id === organ.id;
          const isAudioPlaying = playingId === organ.id;

          return (
            <div
              key={organ.id}
              onClick={() => setSelectedOrgan(organ)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#151924] border-[#c99e42] shadow-xl'
                  : 'bg-[#0f1118] border-[#212738] hover:border-[#3b4763] hover:bg-[#131622]'
              }`}
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono-code text-[11px] text-[#64748b]">
                  Lámina {organ.id.toUpperCase().slice(0, 8)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySound(organ);
                  }}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isAudioPlaying
                      ? 'bg-[#c99e42]/20 border-[#c99e42] text-[#f5d77f] animate-pulse'
                      : 'bg-[#1a202c] border-[#2d3748] text-[#94a3b8] hover:text-[#e2e8f0]'
                  }`}
                  title="Escuchar resonancia acústica del órgano"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Poetic description */}
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#f1f5f9] tracking-wide mb-1">
                  {organ.name}
                </h3>
                <p className="text-xs text-[#cbd5e1] font-garamond italic line-clamp-3 leading-relaxed">
                  {organ.functionText}
                </p>
              </div>

              {/* Attributes badge list */}
              <div className="mt-4 pt-3 border-t border-[#1e2434] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-mono-code text-[#8f96a3] text-[11px]">Emoción:</span>
                  <span className="text-[#38bdf8] font-medium">{organ.emotion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono-code text-[#8f96a3] text-[11px]">Geometría:</span>
                  <span className="text-[#cbd5e1] truncate max-w-[170px]">{organ.geometry}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Organ Anatomical Dossier */}
      {selectedOrgan && (
        <div className="bg-[#11131a] border border-[#232938] rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="border-b border-[#252c3c] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-cinzel text-[#d4af37] tracking-widest uppercase block">
                Tratado de Anatomía
              </span>
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-[#f8fafc] mt-0.5">
                {selectedOrgan.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlaySound(selectedOrgan)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1e2535] hover:bg-[#2b354c] text-[#38bdf8] text-xs font-mono-code border border-[#35435e] transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>{playingId === selectedOrgan.id ? 'Silenciar' : 'Escuchar Frecuencia'}</span>
              </button>

              {onSpawnOrganismWithOrgan && (
                <button
                  onClick={() => onSpawnOrganismWithOrgan(selectedOrgan.name)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#c99e42] to-[#b3832c] text-[#0f1117] font-cinzel text-xs font-bold transition-all hover:brightness-110"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Traducir Criatura</span>
                </button>
              )}
            </div>
          </div>

          {/* Poetic Manifest Fragment */}
          <div className="p-5 rounded-xl bg-[#090b10] border-l-2 border-[#c99e42] border-y border-r border-[#1e2535]">
            <p className="font-garamond italic text-base md:text-lg text-[#d8dde8] leading-relaxed whitespace-pre-line">
              {selectedOrgan.poeticText}
            </p>
          </div>

          {/* 4 Pillars of the Organ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#0d1017] border border-[#202737]">
              <span className="flex items-center gap-1.5 text-xs font-mono-code text-[#38bdf8] uppercase tracking-wider mb-1.5">
                <Activity className="w-3.5 h-3.5" />
                Función Ontológica
              </span>
              <p className="text-xs text-[#cbd5e1] font-garamond leading-relaxed">
                {selectedOrgan.functionText}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0d1017] border border-[#202737]">
              <span className="flex items-center gap-1.5 text-xs font-mono-code text-[#a855f7] uppercase tracking-wider mb-1.5">
                <Compass className="w-3.5 h-3.5" />
                Geometría & Sonido
              </span>
              <p className="text-xs text-[#cbd5e1] font-garamond leading-relaxed">
                {selectedOrgan.geometry}. {selectedOrgan.sound}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0d1017] border border-[#202737]">
              <span className="flex items-center gap-1.5 text-xs font-mono-code text-[#ef4444] uppercase tracking-wider mb-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Enfermedades
              </span>
              <p className="text-xs text-[#cbd5e1] font-garamond leading-relaxed">
                {selectedOrgan.diseases}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0d1017] border border-[#202737]">
              <span className="flex items-center gap-1.5 text-xs font-mono-code text-[#10b981] uppercase tracking-wider mb-1.5">
                <Zap className="w-3.5 h-3.5" />
                Mutaciones
              </span>
              <p className="text-xs text-[#cbd5e1] font-garamond leading-relaxed">
                {selectedOrgan.mutaciones}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
