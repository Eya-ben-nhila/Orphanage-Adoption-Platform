
import React from 'react';
import { FamilyProfile, NenType } from '../types';

interface PreferencesViewProps {
  family: FamilyProfile;
  onUpdateFamily: (f: FamilyProfile) => void;
  onNavigate: () => void;
}

const PreferencesView: React.FC<PreferencesViewProps> = ({ family, onUpdateFamily, onNavigate }) => {
  const toggleNen = (type: NenType) => {
    const current = family.preferences.nenCompatibility;
    const next = current.includes(type) ? current.filter(t => t !== type) : [...current, type];
    onUpdateFamily({
      ...family,
      preferences: { ...family.preferences, nenCompatibility: next }
    });
  };

  const updateBackground = (field: keyof FamilyProfile['backgroundInfo'], value: any) => {
    onUpdateFamily({
      ...family,
      backgroundInfo: { ...family.backgroundInfo, [field]: value }
    });
  };

  return (
    <div className="px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-black tracking-tight">Guardian Profile</h1>
        <p className="text-sm text-slate-500 mt-2">Accurate background info improves your bond compatibility.</p>
      </header>

      <div className="space-y-8">
        {/* Info Card */}
        <section className="bg-surface-dark rounded-2xl p-6 border border-white/5 space-y-6">
           <div>
              <label className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">Household Background</label>
              <textarea 
                value={family.backgroundInfo.bio}
                onChange={(e) => updateBackground('bio', e.target.value)}
                className="w-full bg-background-dark border border-white/5 rounded-xl text-sm p-4 min-h-[120px] focus:ring-1 focus:ring-primary focus:border-primary outline-none text-slate-300 placeholder:text-slate-700"
                placeholder="Describe your family environment..."
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Occupation</label>
                <input 
                  type="text"
                  value={family.backgroundInfo.occupation}
                  onChange={(e) => updateBackground('occupation', e.target.value)}
                  className="w-full bg-background-dark border border-white/5 rounded-xl text-sm p-3 focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Household Size</label>
                <input 
                  type="number"
                  value={family.backgroundInfo.householdSize}
                  onChange={(e) => updateBackground('householdSize', parseInt(e.target.value))}
                  className="w-full bg-background-dark border border-white/5 rounded-xl text-sm p-3 focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
           </div>
        </section>

        {/* Preferences Section */}
        <section className="space-y-6">
           <div className="bg-surface-dark p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <label className="text-sm font-bold text-white">Desired Age Range</label>
                <span className="text-xs font-black text-primary px-3 py-1 bg-primary/10 rounded-full">0 - {family.preferences.ageRange[1]}Y</span>
              </div>
              <input 
                type="range" min="0" max="18" 
                value={family.preferences.ageRange[1]} 
                onChange={(e) => onUpdateFamily({
                  ...family,
                  preferences: { ...family.preferences, ageRange: [0, parseInt(e.target.value)] }
                })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" 
              />
           </div>

           <div className="bg-surface-dark p-6 rounded-2xl border border-white/5">
              <label className="text-sm font-bold text-white block mb-6">Nen Compatibility (Aura Type)</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(NenType).map(type => (
                  <button
                    key={type}
                    onClick={() => toggleNen(type)}
                    className={`py-4 rounded-xl text-[10px] font-black border-2 transition-all flex items-center justify-center gap-2 ${
                      family.preferences.nenCompatibility.includes(type) 
                      ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10' 
                      : 'bg-background-dark/50 border-white/5 text-slate-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
           </div>
        </section>

        <button 
          onClick={onNavigate}
          className="w-full bg-primary py-5 rounded-2xl font-black text-white text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Save Profile Changes
        </button>
      </div>
    </div>
  );
};

export default PreferencesView;
