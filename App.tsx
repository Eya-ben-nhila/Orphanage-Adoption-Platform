
import React, { useState, useCallback } from 'react';
import { ViewState, ChildProfile, NenType, FamilyProfile } from './types';
import HomeView from './views/HomeView';
import DiscoverView from './views/DiscoverView';
import VerifyView from './views/VerifyView';
import PreferencesView from './views/PreferencesView';
import ChildDetailView from './views/ChildDetailView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [family, setFamily] = useState<FamilyProfile>({
    id: 'f1',
    name: 'Ging Freecss',
    verifiedStatus: 'Provisional',
    step: 3,
    verificationProgress: 45,
    isFullyVerified: false,
    backgroundInfo: {
      bio: "Ruin Hunter exploring the world's greatest mysteries. Looking for a home that values curiosity and resilience.",
      occupation: "Archaeological Hunter",
      hasCriminalRecord: false,
      financialStability: "Unlimited (Hunter License)",
      householdSize: 1,
      documentsUploaded: ["License_Scan.pdf"]
    },
    verificationChecks: [
      { id: '1', label: 'Hunter License Authenticity', status: 'PASSED', details: 'Validated against Association DB' },
      { id: '2', label: 'Criminal Database Search', status: 'PASSED', details: 'No match in Phantom Troupe or Mafia logs' },
      { id: '3', label: 'Financial Solvency', status: 'PENDING', details: 'Awaiting Bank of Yorknew confirmation' },
      { id: '4', label: 'Psychological Assessment', status: 'PENDING', details: 'AI Evaluation in progress' }
    ],
    preferences: {
      ageRange: [0, 14],
      nenCompatibility: [NenType.ENHANCER, NenType.EMITTER],
      specialCare: false
    }
  });

  const navigateTo = useCallback((view: ViewState, child?: ChildProfile) => {
    if (child) setSelectedChild(child);
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

  const updateFamily = (updated: FamilyProfile) => {
    setFamily(updated);
  };

  return (
    <div className="flex justify-center w-full min-h-screen">
      <main className="w-full max-w-[430px] min-h-screen bg-slate-50 dark:bg-background-dark relative flex flex-col shadow-2xl overflow-hidden border-x border-slate-200 dark:border-white/5">
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          {currentView === 'HOME' && <HomeView family={family} onNavigate={navigateTo} />}
          {currentView === 'DISCOVER' && <DiscoverView onNavigate={navigateTo} />}
          {currentView === 'VERIFY' && <VerifyView family={family} onUpdateFamily={updateFamily} onNavigate={() => navigateTo('HOME')} />}
          {currentView === 'PREFERENCES' && <PreferencesView family={family} onUpdateFamily={updateFamily} onNavigate={() => navigateTo('HOME')} />}
          {currentView === 'CHILD_DETAIL' && selectedChild && (
            <ChildDetailView child={selectedChild} family={family} onBack={() => navigateTo('DISCOVER')} />
          )}
        </div>

        <nav className="fixed bottom-0 w-full max-w-[430px] bg-white/95 dark:bg-surface-dark/95 ios-blur border-t border-slate-200 dark:border-white/5 h-20 px-8 flex justify-between items-start pt-3 pb-8 z-50">
          <NavButton icon="home" label="Portal" active={currentView === 'HOME'} onClick={() => navigateTo('HOME')} />
          <NavButton icon="explore" label="Aspirants" active={currentView === 'DISCOVER'} onClick={() => navigateTo('DISCOVER')} />
          <NavButton icon="security" label="Vetting" active={currentView === 'VERIFY'} onClick={() => navigateTo('VERIFY')} />
          <NavButton icon="person" label="Profile" active={currentView === 'PREFERENCES'} onClick={() => navigateTo('PREFERENCES')} />
        </nav>
      </main>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary scale-110' : 'text-slate-400 opacity-60'}`}>
    <span className="material-icons-round text-2xl">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
