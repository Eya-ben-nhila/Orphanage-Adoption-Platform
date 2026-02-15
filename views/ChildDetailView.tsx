
import React, { useState, useEffect } from 'react';
import { ChildProfile, FamilyProfile } from '../types';
import { analyzeCompatibility } from '../services/gemini';

interface ChildDetailViewProps {
  child: ChildProfile;
  family: FamilyProfile;
  onBack: () => void;
}

const ChildDetailView: React.FC<ChildDetailViewProps> = ({ child, family, onBack }) => {
  const [aiMatch, setAiMatch] = useState<string>('Initiating AI Bond Analysis...');
  const [requestStatus, setRequestStatus] = useState<'IDLE' | 'LOADING' | 'SENT'>('IDLE');

  useEffect(() => {
    const fetchMatch = async () => {
      const result = await analyzeCompatibility(child, family);
      setAiMatch(result);
    };
    fetchMatch();
  }, [child, family]);

  const handleRequest = async () => {
    if (!family.isFullyVerified) return;
    setRequestStatus('LOADING');
    await new Promise(r => setTimeout(r, 1500));
    setRequestStatus('SENT');
  };

  return (
    <div className="pb-32">
      <div className="h-16 w-full bg-background-dark/80 sticky top-0 z-50 ios-blur flex items-center justify-between px-6 border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-light border border-white/10 shadow-lg">
          <span className="material-icons-round text-lg">arrow_back_ios_new</span>
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Aspirant Profile</span>
        <div className="w-10"></div>
      </div>

      <div className="p-6">
        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/5">
          <img src={child.image} className="w-full h-full object-cover" alt={child.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {child.traits.slice(0, 2).map(trait => (
              <span key={trait} className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                {trait}
              </span>
            ))}
          </div>

          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl font-black text-white tracking-tighter">{child.name}, {child.age}</h1>
            <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">{child.region}</p>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="mt-8 bg-surface-dark border border-white/5 rounded-3xl p-6 relative overflow-hidden">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                 <span className="material-icons-round text-primary text-xl">psychology</span>
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest text-white">Association Forecast</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Aura & Lifestyle Matching</p>
              </div>
           </div>
           <p className="text-sm italic text-slate-400 leading-relaxed font-medium">"{aiMatch}"</p>
           <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-icons-round text-6xl">query_stats</span>
           </div>
        </div>

        {/* Requirements Grid */}
        <div className="mt-10">
          <h2 className="text-lg font-black tracking-tight mb-6 flex items-center gap-3">
             <div className="w-1.5 h-6 bg-primary rounded-full"></div>
             Placement Needs
          </h2>
          <div className="grid grid-cols-2 gap-4">
             {Object.entries(child.needs).map(([key, value]) => (
                 key !== 'securityLevel' && (
                    <div key={key} className="p-5 rounded-2xl bg-surface-dark border border-white/5">
                        <h3 className="text-[9px] font-black uppercase tracking-widest text-primary mb-2 opacity-60">{key}</h3>
                        <p className="text-xs font-bold text-slate-300 leading-snug">{value}</p>
                    </div>
                 )
             ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-black tracking-tight mb-4 flex items-center gap-3">
             <div className="w-1.5 h-6 bg-accent rounded-full"></div>
             Background
          </h2>
          <p className="text-sm text-slate-400 leading-loose font-medium">
            {child.bio}
          </p>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background-dark/80 ios-blur border-t border-white/5 z-40 max-w-[430px] mx-auto">
        <div className="flex items-center gap-4">
          <button className="w-16 h-16 rounded-2xl bg-surface-light flex items-center justify-center text-slate-500 border border-white/10 hover:text-red-400 transition-colors">
            <span className="material-icons-round text-2xl">favorite_border</span>
          </button>
          
          <button 
            disabled={!family.isFullyVerified || requestStatus === 'SENT'}
            onClick={handleRequest}
            className={`flex-1 h-16 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl ${
                !family.isFullyVerified ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' :
                requestStatus === 'SENT' ? 'bg-green-500 text-white shadow-green-500/20' :
                'bg-primary text-white shadow-primary/20 active:scale-95'
            }`}
          >
            {requestStatus === 'LOADING' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : requestStatus === 'SENT' ? (
                <>Request Dispatched <span className="material-icons-round">done_all</span></>
            ) : !family.isFullyVerified ? (
                <>Identity Vetting Required <span className="material-icons-round text-sm">lock</span></>
            ) : (
                <>Request Introduction <span className="material-icons-round text-sm">send</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildDetailView;
