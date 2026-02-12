
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import SOPVault from './components/SOPVault';
import Tools from './components/Tools';
import GrowthEngine from './components/GrowthEngine';
import SchedulingOptimizer from './components/SchedulingOptimizer';
import { Clock, Bell, Smartphone, X, ChevronRight, Share, Menu, Zap, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    // Hide splash screen after initial render and a short delay
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className={`flex-1 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} p-3 md:p-6 lg:p-6 min-h-screen relative w-full flex flex-col transition-all duration-300 animate-in fade-in-5 duration-1000`}>
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
