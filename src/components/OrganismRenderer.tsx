import { useState, useMemo } from 'react';
import { LivingOrganism } from '../types';
import { Download, Sparkles, Volume2, Share2, Check } from 'lucide-react';
import { bioAudio } from '../utils/audioSynthesizer';

interface OrganismRendererProps {
  organism: LivingOrganism;
  onFeedParadox?: () => void;
  size?: number;
}

export default function OrganismRenderer({ organism, onFeedParadox, size = 420 }: OrganismRendererProps) {
  const [copied, setCopied] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const { vector } = organism;
  const { seed } = vector.alphabet;
  const { geometryType } = vector.movement;

  // Generate procedural organic SVG paths based on seed and geometry
  const proceduralGeometry = useMemo(() => {
    const center = 210;
    const tentacles: string[] = [];
    const ribs: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const particles: { cx: number; cy: number; r: number; delay: number }[] = [];

    // Radial or Spiral tentacles
    const count = 8 + (seed % 8);
    for (let i = 0; i < count; i++) {
      const angle = (i * (2 * Math.PI)) / count;
      const length = 90 + ((seed + i * 17) % 65);
      const cp1x = center + Math.cos(angle - 0.4) * (length * 0.5);
      const cp1y = center + Math.sin(angle - 0.4) * (length * 0.5);
      const cp2x = center + Math.cos(angle + 0.3) * (length * 0.85);
      const cp2y = center + Math.sin(angle + 0.3) * (length * 0.85);
      const endX = center + Math.cos(angle) * length;
      const endY = center + Math.sin(angle) * length;

      tentacles.push(`M ${center} ${center} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`);
    }

    // Mineral ribs for Carbón / bone structures
    const ribPairs = 5 + (seed % 4);
    for (let r = 0; r < ribPairs; r++) {
      const offsetY = center - 50 + r * 22;
      const span = 45 + Math.sin((r / ribPairs) * Math.PI) * 55;
      ribs.push({ x1: center - span, y1: offsetY + 8, x2: center + span, y2: offsetY + 8 });
    }

    // Floating biomorphic spore particles
    for (let p = 0; p < 14; p++) {
      const pAngle = ((seed * (p + 3)) % 360) * (Math.PI / 180);
      const pDist = 60 + ((seed + p * 31) % 110);
      particles.push({
        cx: center + Math.cos(pAngle) * pDist,
        cy: center + Math.sin(pAngle) * pDist,
        r: 1.8 + ((p * 7) % 3.5),
        delay: (p * 0.3) % 2
      });
    }

    return { tentacles, ribs, particles };
  }, [seed]);

  const handleHearPulse = () => {
    bioAudio.triggerHeartbeat(vector.sound.bpm);
    bioAudio.playOrganismSound(vector.sound.pitchHz, vector.sound.waveform, vector.sound.bpm);
  };

  const downloadSvg = () => {
    const svgEl = document.getElementById(`organism-svg-${organism.id}`);
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nuscuria-${organism.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyDossier = () => {
    const text = `【 NUSCURIA - FICHA DE ENTIDAD VIVA 】\n` +
      `Especie: ${organism.speciesName}\n` +
      `Reino: ${organism.kingdom}\n` +
      `Órgano Primario: ${vector.organs.primary.name}\n` +
      `Emoción Dominante: ${vector.emotions.dominant} (${vector.emotions.dominantScore}%)\n` +
      `Geometría Afectiva: ${vector.movement.geometryLabel}\n` +
      `Cadencia: ${vector.movement.cadence}\n` +
      `Sonido: ${vector.sound.description}\n` +
      `Color: ${vector.color.name}\n\n` +
      `Poema y Ontología:\n${organism.poeticText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative flex flex-col items-center bg-[#0e1017] rounded-2xl border border-[#232938] p-5 shadow-2xl overflow-hidden group">
      
      {/* Bioluminescent Background Aura */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${vector.color.primaryHex}, ${vector.color.secondaryHex} 60%, transparent 85%)`
        }}
      />

      {/* Top Specimen Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-[#232938] z-10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: vector.color.primaryHex }} />
          <span className="font-mono-code text-[#94a3b8] uppercase tracking-wider text-[11px]">
            Organismo #{organism.vector.alphabet.seed.toString().slice(-4)}
          </span>
        </div>
        <span className="font-cinzel text-[#d4af37] tracking-wider text-[11px] px-2 py-0.5 rounded bg-[#181d28] border border-[#2b3346]">
          {organism.kingdom}
        </span>
      </div>

      {/* Main Interactive SVG Container */}
      <div className="relative my-3 flex items-center justify-center cursor-crosshair">
        <svg
          id={`organism-svg-${organism.id}`}
          viewBox="0 0 420 420"
          width={size}
          height={size}
          className="overflow-visible filter drop-shadow-lg transition-transform duration-500 hover:scale-[1.02]"
        >
          <defs>
            {/* Core Gradient */}
            <radialGradient id={`grad-core-${organism.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={vector.color.accentHex} stopOpacity="0.95" />
              <stop offset="45%" stopColor={vector.color.primaryHex} stopOpacity="0.75" />
              <stop offset="100%" stopColor={vector.color.secondaryHex} stopOpacity="0.1" />
            </radialGradient>

            {/* Aura Glow */}
            <filter id={`glow-${organism.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Concentric Geometry / Affective Field */}
          <g className="opacity-25 stroke-[#475569]" strokeDasharray="3 4">
            <circle cx="210" cy="210" r="160" fill="none" strokeWidth="0.8" />
            <circle cx="210" cy="210" r="120" fill="none" strokeWidth="0.8" />
            <circle cx="210" cy="210" r="80" fill="none" strokeWidth="0.8" />
            <line x1="50" y1="210" x2="370" y2="210" strokeWidth="0.5" />
            <line x1="210" y1="50" x2="210" y2="370" strokeWidth="0.5" />
          </g>

          {/* Living breathing organism body */}
          <g 
            className="transition-transform duration-1000 origin-center"
            style={{
              animation: `organism-breathe ${vector.movement.speed}s ease-in-out infinite alternate`
            }}
          >
            {/* Pulsing Aura Ripples */}
            <circle
              cx="210"
              cy="210"
              r="105"
              fill="none"
              stroke={vector.color.primaryHex}
              strokeWidth="1.5"
              strokeOpacity="0.35"
              className="animate-pulse"
            />
            <circle
              cx="210"
              cy="210"
              r="135"
              fill="none"
              stroke={vector.color.accentHex}
              strokeWidth="0.8"
              strokeDasharray="4 6"
              strokeOpacity="0.3"
            />

            {/* Tentacles / Radial limbs / Organic filigree */}
            {proceduralGeometry.tentacles.map((pathD, idx) => (
              <path
                key={`tentacle-${idx}`}
                d={pathD}
                fill="none"
                stroke={idx % 2 === 0 ? vector.color.primaryHex : vector.color.accentHex}
                strokeWidth={idx % 3 === 0 ? '2.4' : '1.4'}
                strokeLinecap="round"
                strokeOpacity={0.75}
                filter={`url(#glow-${organism.id})`}
                onMouseEnter={() => setHoveredPart(`Filamento #${idx + 1}: ${vector.movement.geometryLabel}`)}
                onMouseLeave={() => setHoveredPart(null)}
                className="transition-all duration-300 hover:stroke-white hover:stroke-width-3 cursor-pointer"
              />
            ))}

            {/* Mineral Ribs / Vertebrae (if mammal/bone/fossil archetype) */}
            {proceduralGeometry.ribs.map((rib, idx) => (
              <line
                key={`rib-${idx}`}
                x1={rib.x1}
                y1={rib.y1}
                x2={rib.x2}
                y2={rib.y2}
                stroke={vector.color.accentHex}
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity={0.6}
                onMouseEnter={() => setHoveredPart(`Costilla/Astas #${idx + 1}: Arquitectura de ${vector.organs.primary.name}`)}
                onMouseLeave={() => setHoveredPart(null)}
                className="hover:stroke-white cursor-pointer"
              />
            ))}

            {/* Central Cellular Body & Nucleus */}
            <g
              onMouseEnter={() => setHoveredPart(`Núcleo Vital: ${vector.organs.primary.name} (${vector.emotions.dominant})`)}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer"
            >
              {/* Outer membrane */}
              <circle
                cx="210"
                cy="210"
                r="64"
                fill={`url(#grad-core-${organism.id})`}
                stroke={vector.color.primaryHex}
                strokeWidth="2.5"
                strokeDasharray={geometryType === 'fractura' ? '6 3' : 'none'}
              />

              {/* Inner Organ Core (Analog Heart / Fossil Lung) */}
              <circle
                cx="210"
                cy="210"
                r="36"
                fill={vector.color.primaryHex}
                fillOpacity="0.4"
                stroke={vector.color.accentHex}
                strokeWidth="1.8"
                className="animate-ping origin-center"
                style={{ animationDuration: `${Math.max(1, 60 / vector.sound.bpm)}s` }}
              />

              {/* Alchemical / Biological Glyphs in Nucleus */}
              <circle cx="210" cy="210" r="14" fill={vector.color.accentHex} fillOpacity="0.85" />
              <circle cx="210" cy="210" r="5" fill="#ffffff" />
            </g>

            {/* Biomorphic spores / floating sensory nodes */}
            {proceduralGeometry.particles.map((p, idx) => (
              <circle
                key={`spore-${idx}`}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill={idx % 2 === 0 ? vector.color.accentHex : vector.color.primaryHex}
                fillOpacity={0.8}
                className="animate-pulse"
                style={{ animationDelay: `${p.delay}s` }}
              />
            ))}
          </g>
        </svg>

        {/* Hover Part Inspector Badge */}
        {hoveredPart && (
          <div className="absolute bottom-2 px-3 py-1.5 rounded-lg bg-[#10141f]/95 border border-[#38bdf8]/40 text-[#f1f5f9] text-xs font-mono-code shadow-xl pointer-events-none backdrop-blur-sm animate-fade-in">
            🜁 {hoveredPart}
          </div>
        )}
      </div>

      {/* Style for organic breathing animation */}
      <style>{`
        @keyframes organism-breathe {
          0% { transform: scale(0.95) rotate(-0.5deg); }
          50% { transform: scale(1.03) rotate(0.8deg); }
          100% { transform: scale(0.97) rotate(-0.3deg); }
        }
      `}</style>

      {/* Bottom Controls */}
      <div className="w-full flex items-center justify-between pt-3 border-t border-[#232938] z-10 gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleHearPulse}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181d28] hover:bg-[#252c3d] text-[#e2e8f0] text-xs font-mono-code border border-[#2b3346] transition-colors"
            title="Escuchar pulso cardíaco y frecuencia del organismo"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>{vector.sound.pitchHz} Hz</span>
          </button>

          {onFeedParadox && (
            <button
              onClick={onFeedParadox}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#281b18] hover:bg-[#3d2722] text-[#fca5a5] text-xs font-mono-code border border-[#7f1d1d]/40 transition-colors"
              title="Alimentar criatura con paradoja poética para inducir mutación"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ef4444]" />
              <span className="hidden sm:inline">Nutrir Paradoja</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={copyDossier}
            className="p-1.5 rounded-lg bg-[#181d28] hover:bg-[#252c3d] text-[#cbd5e1] border border-[#2b3346] transition-colors"
            title="Copiar ficha ontológica"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={downloadSvg}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-[#f8fafc] text-xs font-mono-code border border-[#475569] transition-colors"
            title="Descargar criatura en SVG vectorial"
          >
            <Download className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>SVG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
