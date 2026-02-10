
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import SOPVault from './components/SOPVault';
import Tools from './components/Tools';
import GrowthEngine from './components/GrowthEngine';
import SchedulingOptimizer from './components/SchedulingOptimizer';
import MobileSetup from './components/MobileSetup';
import { Clock, Bell, Smartphone, X, ChevronRight, Share, Menu, Zap, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isStandalone) {
      setShowInstallBanner(true);
    }
  }, [isStandalone]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'chat':
        return <ChatInterface />;
      case 'sop':
        return <SOPVault />;
      case 'tools':
        return <Tools />;
      case 'growth':
        return <GrowthEngine />;
      case 'calendar':
        return <SchedulingOptimizer />;
      case 'setup':
        return <MobileSetup />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1 lg:ml-64 p-3 md:p-6 lg:p-6 min-h-screen relative w-full flex flex-col">
        {showInstallBanner && (
          <div className="mb-4 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between animate-in slide-in-from-top-4 duration-500 border border-slate-800 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="bg-orange-500 p-2 rounded-xl flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">
                  Deploy as a Standalone Web App
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Install RuffBot on your home screen to exit 'Web Preview' and enable a full-screen production experience.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button 
                onClick={() => setActiveTab('setup')}
                className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
              >
                Start Deployment <ChevronRight className="w-3 h-3" />
              </button>
              <button onClick={() => setShowInstallBanner(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <header className="flex justify-between items-center mb-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm sticky top-3 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-500">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-slate-200" />
            
            <button 
              onClick={() => setActiveTab('setup')}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 ${
                isStandalone 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm' 
                  : 'bg-orange-50 border-orange-200 text-orange-600 animate-pulse'
              }`}
            >
              {isStandalone ? <ShieldCheck className="w-2.5 h-2.5" /> : <Smartphone className="w-2.5 h-2.5" />}
              {isStandalone ? 'Production Active' : 'Web Preview (Deploy Now)'}
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-3 pl-1">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-none">Admin Station</p>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Status: Secure</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold border border-slate-100 shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col">
          {renderContent()}
        </div>

        <footer className="mt-auto py-6 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] px-4">
            RuffBot COO Suite • Proprietary Operational Backbone • v2.2.6
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
