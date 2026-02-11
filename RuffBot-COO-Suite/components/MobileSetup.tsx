
import React, { useState } from 'react';
import { Smartphone, Share, PlusSquare, ArrowUp, CheckCircle2, Copy, Check, ShieldCheck, Zap, ExternalLink, MousePointer2, Send, Monitor, AlertTriangle, XCircle, Search, Info, MonitorCheck, Tablet, ArrowRightCircle, Mail, Globe, Rocket, Shield } from 'lucide-react';

const MobileSetup: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-5xl mx-auto w-full">
      <header className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-slate-900 rounded-2xl mb-4 shadow-xl shadow-slate-200">
          <Rocket className="w-7 h-7 text-orange-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Deployment & Web App Setup</h2>
        <p className="text-slate-500 text-sm font-medium">Transition your Virtual COO from a development draft to a live production tool.</p>
      </header>

      {/* DEPLOYMENT MISSION CONTROL */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`relative flex h-2 w-2`}>
                  <div className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isStandalone ? 'bg-emerald-400' : 'bg-orange-400'}`}></div>
                  <div className={`relative inline-flex rounded-full h-2 w-2 ${isStandalone ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isStandalone ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {isStandalone ? 'Production Deployment: LIVE' : 'Deployment Status: PENDING'}
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">Deployment Control Center</h3>
            </div>
            <button 
              onClick={copyCurrentUrl}
              className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 transition-all flex items-center gap-2 shadow-lg"
            >
              {copied ? <Check className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              {copied ? 'Production URL Copied' : 'Get Production Link'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-5 rounded-2xl border transition-all ${isStandalone ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-sm">1. Host Web App</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">Host the app via Google AI Studio's Public Preview Link feature.</p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> DEPLOYED TO CLOUD
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all ${isStandalone ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-sm">2. Secure Link</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">Ensure only the Public Preview URL is used for day-to-day operations.</p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> ACCESS VERIFIED
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all ${isStandalone ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/10' : 'bg-slate-800 border-slate-700 animate-pulse'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-sm">3. Hardware Install</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">Install as a PWA on your Surface or iPhone to exit 'Preview Mode'.</p>
              <div className={`flex items-center gap-2 text-[10px] font-bold ${isStandalone ? 'text-emerald-400' : 'text-orange-400'}`}>
                {isStandalone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {isStandalone ? 'INSTALLATION COMPLETE' : 'AWAITING HARDWARE'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2: DEVICE SPECIFIC INSTALLATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SURFACE / WINDOWS SECTION */}
        <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-sm relative overflow-hidden border border-slate-100">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Tablet className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black shadow-md italic">A</div>
              <h3 className="text-xl font-black italic tracking-tight uppercase">Deploy to Surface</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold leading-relaxed">
                   1. Open your <strong>Production Link</strong> in Microsoft Edge.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold leading-relaxed flex items-center gap-2">
                   2. Click <MonitorCheck className="w-4 h-4 text-blue-600" /> <strong>Install App</strong> in the top address bar.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold leading-relaxed">
                   3. Pin to Taskbar for one-click Virtual COO access.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IPHONE SECTION */}
        <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Smartphone className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center font-black shadow-md italic">B</div>
              <h3 className="text-xl font-black italic tracking-tight uppercase">Deploy to iPhone</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="text-xs font-bold leading-relaxed">
                   1. Open link in <strong>Safari</strong>.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="text-xs font-bold leading-relaxed flex items-center gap-2">
                   2. Tap Share <Share className="w-3.5 h-3.5" /> then <strong>"Add to Home Screen"</strong>.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="text-xs font-bold leading-relaxed">
                   3. Launch from your home screen as a standalone app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 text-slate-400 pt-4">
        <div className="flex items-center gap-2">
           <ShieldCheck className="w-4 h-4" />
           <span className="text-[9px] font-black uppercase tracking-[0.2em]">RuffStuff Practice Architecture • Cloud Deployment Ready</span>
        </div>
      </div>
    </div>
  );
};

export default MobileSetup;
