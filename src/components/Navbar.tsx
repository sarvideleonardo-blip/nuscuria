import { useState } from 'react';
import { Sparkles, BookOpen, GitFork, Activity, Shuffle, Volume2, VolumeX, HeartHandshake } from 'lucide-react';
import { bioAudio } from '../utils/audioSynthesizer';

export type ActiveTab = 'translator' | 'bestiary' | 'forest' | 'organs' | 'hybridizer';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentSoundHz?: number;
}

export default function Navbar({ activeTab, onSelectTab, currentSoundHz = 108 }: NavbarProps) {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleSound = () => {
    if (audioPlaying) {
      bioAudio.stop();
      setAudioPlaying(false);
    } else {
      bioAudio.playOrganismSound(currentSoundHz, 'sine', 48);
      setAudioPlaying(true);
    }
  };

  const tabs: { id: ActiveTab; label: string; icon: typeof Sparkles; badge?: string }[] = [
    { id: 'translator', label: 'I. El Traductor', icon: Sparkles },
    { id: 'bestiary', label: 'II. El Bestiario', icon: BookOpen },
    { id: 'forest', label: 'III. Bosque Relacional', icon: GitFork, badge: 'Micelio' },
    { id: 'organs', label: 'IV. Órganos Conceptuales', icon: Activity, badge: '9' },
    { id: 'hybridizer', label: 'V. Hibridador', icon: Shuffle }
  ];

  return (
    <header className="border-b border-[#252a36] bg-[#0c0e14]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand & Slogan */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c99e42]/20 to-[#38bdf8]/10 border border-[#c99e42]/40 flex items-center justify-center text-[#d4af37] shadow-inner">
              <span className="font-cinzel text-xl font-bold">🜂</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-[#f1f3f9]">
                  NUSCURIA
                </h1>
                <span className="text-[10px] tracking-widest font-mono-code uppercase px-2 py-0.5 rounded bg-[#1e2330] text-[#9ca3af] border border-[#2e3547]">
                  Códice Vivo
                </span>
              </div>
              <p className="text-xs text-[#8f96a3] italic font-garamond tracking-wide mt-0.5">
                «La app es un órgano del organismo, no el organismo.»
              </p>
            </div>
          </div>

          {/* Navigation Controls & Audio */}
          <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2">
            <nav className="flex items-center bg-[#13161f] p-1 rounded-xl border border-[#252b3b] shadow-inner" aria-label="Secciones">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    id={`nav-btn-${t.id}`}
                    onClick={() => onSelectTab(t.id)}
                    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#242b3b] text-[#f8fafc] shadow-sm border border-[#3b455c]'
                        : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#1a1f2c]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#c99e42]' : 'text-[#64748b]'}`} />
                    <span className="font-cinzel tracking-wider">{t.label}</span>
                    {t.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-[#0f172a] text-[#7dd3fc] font-mono-code border border-[#38bdf8]/30">
                        {t.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Audio Resonator Button */}
            <button
              id="audio-toggle-btn"
              onClick={toggleSound}
              title={audioPlaying ? 'Silenciar resonancia análoga' : 'Activar resonancia y pulso del organismo'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code border transition-all duration-200 ${
                audioPlaying
                  ? 'bg-[#c99e42]/20 text-[#f5d77f] border-[#c99e42]/60 animate-pulse'
                  : 'bg-[#13161f] text-[#94a3b8] border-[#252b3b] hover:text-[#e2e8f0] hover:border-[#3b455c]'
              }`}
            >
              {audioPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{audioPlaying ? 'Resonando' : 'Resonancia'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
