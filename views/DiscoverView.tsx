
import React from 'react';
import { ViewState, ChildProfile } from '../types';
import { MOCK_CHILDREN } from '../constants';

interface DiscoverViewProps {
  onNavigate: (view: ViewState, child?: ChildProfile) => void;
}

const DiscoverView: React.FC<DiscoverViewProps> = ({ onNavigate }) => {
  return (
    <div className="px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">New Aspirants</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Discover children waiting for a safe home.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_CHILDREN.map(child => (
          <div 
            key={child.id}
            onClick={() => onNavigate('CHILD_DETAIL', child)}
            className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-primary/5 flex cursor-pointer hover:border-primary/30 transition-all active:scale-95"
          >
            <div className="w-32 h-40 flex-shrink-0 relative">
              <img src={child.image} alt={child.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-800">{child.age}Y</div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg dark:text-white">{child.name}</h3>
                  <span className="material-icons-round text-slate-300">favorite_border</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{child.region}</p>
                <div className="flex flex-wrap gap-1">
                  {child.traits.slice(0, 2).map(trait => (
                    <span key={trait} className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-medium">{trait}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="material-icons-round text-xs">verified_user</span> Verified
                </div>
                <span className="text-xs font-bold text-primary">View Bio</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverView;
