
import React from 'react';
import { FamilyProfile, ViewState, ChildProfile } from '../types';
import { MOCK_CHILDREN } from '../constants';

interface HomeViewProps {
  family: FamilyProfile;
  onNavigate: (view: ViewState, child?: ChildProfile) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ family, onNavigate }) => {
  const featured = MOCK_CHILDREN[0];

  return (
    <div className="px-6 py-10">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 overflow-hidden shadow-lg shadow-primary/10">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyJAVPNDrY924BKTpr6Y43GM51CaA1vUDYCVaSltysUhaoT6k7NynS-goifCbuui3nU5CQI0TYnGLC3uDfkINCCABOdD3bdBSRTILqQ03vAIKjdxkIn_wEOOUk_wXvVV5dgPTuZqSTp10C4IgKF84Ya-UJLJn6BsLwsmBU_9Fg5gPLz5wmpx9VNrSLPhhpVk-69WdDT17V3zCT5u0KfVeFoAjTbMkV0CSw0sfJDLyl7mbrUoIHLo_8ynzcMgWNGjcPTMpP9Y0ymPU" className="w-full h-full object-cover" />
            </div>
            {family.isFullyVerified && (
              <div className="absolute -top-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-background-dark flex items-center justify-center shadow-lg">
                <span className="material-icons-round text-[10px] text-white">verified</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Hearth Portal</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{family.verifiedStatus} Access</p>
          </div>
        </div>
        <button className="w-10 h-10 bg-surface-light rounded-xl flex items-center justify-center text-primary shadow-sm">
          <span className="material-icons-round">bolt</span>
        </button>
      </header>

      {/* Verification Status Banner */}
      {!family.isFullyVerified && (
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 mb-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Security Protocol Phase 0{family.step}</span>
              <span className="text-xs font-bold">{family.verificationProgress}% Complete</span>
            </div>
            <h2 className="text-xl font-bold mb-1">Unverified Account</h2>
            <p className="text-sm opacity-80 mb-4 leading-relaxed">Safety screening is mandatory for interaction with aspirants.</p>
            <button 
              onClick={() => onNavigate('VERIFY')}
              className="bg-white text-primary px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
            >
              Continue Vetting
            </button>
          </div>
          <span className="material-icons-round absolute -right-4 -bottom-4 text-9xl opacity-10 group-hover:rotate-12 transition-transform">security</span>
        </div>
      )}

      {/* Featured Match */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold tracking-tight">Bond Suggestion</h3>
          <span className="text-[10px] font-bold text-primary uppercase">Refreshed Just Now</span>
        </div>
        <div 
          onClick={() => onNavigate('CHILD_DETAIL', featured)}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 cursor-pointer group"
        >
          <img src={featured.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={featured.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
             <span className="text-white text-[10px] font-bold uppercase tracking-widest">Nen Level 4</span>
          </div>
          <div className="absolute bottom-0 p-8">
            <h4 className="text-3xl font-black text-white leading-none">{featured.name}, {featured.age}</h4>
            <p className="text-white/60 text-xs mt-2 font-medium tracking-wide flex items-center gap-2">
              <span className="material-icons-round text-sm text-primary">psychology</span>
              Compatibility Rating: Exceptional
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Menu */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-surface-dark p-5 rounded-2xl border border-white/5">
           <span className="material-icons-round text-primary mb-3">auto_graph</span>
           <p className="text-xs font-bold text-white mb-1 uppercase tracking-tighter">Matching Stats</p>
           <p className="text-xs text-slate-500">3 Potential Bonds Found</p>
        </div>
        <div className="bg-surface-dark p-5 rounded-2xl border border-white/5">
           <span className="material-icons-round text-accent mb-3">gpp_good</span>
           <p className="text-xs font-bold text-white mb-1 uppercase tracking-tighter">Hazard Check</p>
           <p className="text-xs text-slate-500">No Threats Nearby</p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
