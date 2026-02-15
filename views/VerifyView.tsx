
import React, { useState } from 'react';
import { FamilyProfile, VerificationCheck } from '../types';
import { runThreatAssessment } from '../services/gemini';

interface VerifyViewProps {
  family: FamilyProfile;
  onUpdateFamily: (f: FamilyProfile) => void;
  onNavigate: () => void;
}

const VerifyView: React.FC<VerifyViewProps> = ({ family, onUpdateFamily, onNavigate }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [auditResult, setAuditResult] = useState<{ safe: boolean, reasoning: string } | null>(null);

  const performSecurityAudit = async () => {
    setIsScanning(true);
    setAuditResult(null);
    
    // Simulate multi-stage audit
    await new Promise(r => setTimeout(r, 2000));
    const result = await runThreatAssessment(family);
    
    const updatedChecks: VerificationCheck[] = family.verificationChecks.map(check => {
        if (check.status === 'PENDING') {
            return { ...check, status: 'PASSED', timestamp: new Date().toISOString() };
        }
        return check;
    });

    onUpdateFamily({
        ...family,
        verificationChecks: updatedChecks,
        verificationProgress: 85,
        step: 4
    });

    setAuditResult(result);
    setIsScanning(false);
  };

  return (
    <div className="px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
           <span className="material-icons-round text-primary">security</span>
           Guardian Vetting
        </h1>
        <p className="text-sm text-slate-500 mt-2">The Hunter Association mandates a 5-tier safety check for all adoptions.</p>
      </header>

      {/* Progress Tracker */}
      <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Safety Matrix Status</span>
          <span className="text-xs font-bold">{family.verificationProgress}%</span>
        </div>
        <div className="space-y-4">
          {family.verificationChecks.map(check => (
            <div key={check.id} className="flex items-center justify-between p-3 rounded-xl bg-background-dark/50 border border-white/5">
              <div className="flex items-center gap-3">
                <span className={`material-icons-round text-sm ${
                    check.status === 'PASSED' ? 'text-green-500' : 
                    check.status === 'FAILED' ? 'text-red-500' : 'text-slate-600 animate-pulse'
                }`}>
                  {check.status === 'PASSED' ? 'check_circle' : 
                   check.status === 'FAILED' ? 'error' : 'pending'}
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{check.label}</p>
                  <p className="text-[10px] text-slate-500">{check.details}</p>
                </div>
              </div>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                check.status === 'PASSED' ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-slate-500'
              }`}>{check.status}</span>
            </div>
          ))}
        </div>
      </div>

      {auditResult && (
        <div className={`mb-8 p-5 rounded-2xl border animate-in slide-in-from-top-4 duration-500 ${
            auditResult.safe ? 'bg-primary/5 border-primary/20' : 'bg-red-500/5 border-red-500/20'
        }`}>
          <div className="flex items-center gap-2 mb-3">
             <span className="material-icons-round text-primary">analytics</span>
             <h3 className="font-bold text-xs uppercase tracking-widest">AI Audit Log</h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 font-medium">"{auditResult.reasoning}"</p>
        </div>
      )}

      {/* Action Area */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-surface-light/50 border border-dashed border-white/10 text-center">
            <span className="material-icons-round text-2xl text-slate-600 mb-2">upload_file</span>
            <p className="text-xs font-bold text-slate-400">Upload Household Inspection Video</p>
            <p className="text-[10px] text-slate-500 mt-1">Required for Certified Status</p>
        </div>

        <button 
          onClick={performSecurityAudit}
          disabled={isScanning}
          className="w-full bg-primary hover:bg-accent text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          {isScanning ? (
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-xs uppercase tracking-[0.2em]">Cross-Referencing Criminal Records</span>
              </div>
          ) : (
              <>
                <span className="text-xs uppercase tracking-[0.2em]">Submit for Final Review</span>
                <span className="material-icons-round text-sm">rocket_launch</span>
              </>
          )}
        </button>
        
        <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest leading-loose">
           Zero Tolerance Policy: Dangerous individuals (Hisoka, Spiders, etc.) will be permanently blacklisted and reported to the Hunter Association.
        </p>
      </div>
    </div>
  );
};

export default VerifyView;
