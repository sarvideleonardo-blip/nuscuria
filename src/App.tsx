import { useState, useEffect } from 'react';
import { ActiveTab } from './components/Navbar';
import Navbar from './components/Navbar';
import TranslatorView from './components/TranslatorView';
import BestiaryView from './components/BestiaryView';
import RelationalForestView from './components/RelationalForestView';
import OrgansCabinetView from './components/OrgansCabinetView';
import HybridizerView from './components/HybridizerView';
import { LivingOrganism } from './types';
import { CANONICAL_ORGANISMS, translateTextToOrganism } from './utils/expandedTranslator';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('translator');
  const [bestiaryList, setBestiaryList] = useState<LivingOrganism[]>(() => {
    // Try to load saved organisms from localStorage
    try {
      const saved = localStorage.getItem('nuscuria_bestiary');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return CANONICAL_ORGANISMS;
  });

  // Save to localStorage whenever bestiary changes
  useEffect(() => {
    try {
      localStorage.setItem('nuscuria_bestiary', JSON.stringify(bestiaryList));
    } catch {}
  }, [bestiaryList]);

  const handleSaveToBestiary = (org: LivingOrganism) => {
    setBestiaryList(prev => {
      if (prev.some(item => item.id === org.id)) return prev;
      return [org, ...prev];
    });
  };

  const handleNavigateToTranslatorWithText = (text: string) => {
    setActiveTab('translator');
    // Set a custom event or let state propagate
    const inputField = document.getElementById('translator-input-field') as HTMLInputElement | null;
    if (inputField) {
      inputField.value = text;
      inputField.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const currentHz = bestiaryList[0]?.vector.sound.pitchHz || 108;
  const savedIds = bestiaryList.map(o => o.id);

  return (
    <div className="min-h-screen bg-[#090b10] text-[#e0e4ee] flex flex-col selection:bg-[#c99e42]/20 selection:text-[#f8f9fc]">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentSoundHz={currentHz}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'translator' && (
          <TranslatorView
            onSaveToBestiary={handleSaveToBestiary}
            savedIds={savedIds}
          />
        )}

        {activeTab === 'bestiary' && (
          <BestiaryView
            organisms={bestiaryList}
            onSelectOrganism={(org) => handleNavigateToTranslatorWithText(org.sourceText)}
            onNavigateToTranslator={() => setActiveTab('translator')}
          />
        )}

        {activeTab === 'forest' && (
          <RelationalForestView
            onSpawnOrganismFromNode={handleNavigateToTranslatorWithText}
          />
        )}

        {activeTab === 'organs' && (
          <OrgansCabinetView
            onSpawnOrganismWithOrgan={handleNavigateToTranslatorWithText}
          />
        )}

        {activeTab === 'hybridizer' && (
          <HybridizerView
            onSaveToBestiary={handleSaveToBestiary}
            savedIds={savedIds}
          />
        )}
      </main>

      {/* Minimalist Poetic Footer */}
      <footer className="border-t border-[#1a1f2b] bg-[#07080d] py-6 text-center text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#c99e42] font-cinzel font-bold tracking-wider">NUSCURIA</span>
            <span>—</span>
            <span className="font-garamond italic text-[#94a3b8]">
              Códice de organismos nacidos del lenguaje
            </span>
          </div>
          <div className="font-mono-code text-[11px] text-[#475569]">
            «No almacenar palabras, sino almacenar relaciones.»
          </div>
        </div>
      </footer>
    </div>
  );
}
