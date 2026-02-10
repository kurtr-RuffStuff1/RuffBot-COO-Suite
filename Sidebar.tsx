
import React from 'react';
import { LayoutDashboard, MessageSquare, BookOpen, PenTool, Calendar, ShieldCheck, ChevronRight, TrendingUp, Smartphone, Circle } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'COO Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'RuffBot Chat', icon: MessageSquare },
    { id: 'growth', label: 'Marketing & Growth', icon: TrendingUp },
    { id: 'sop', label: 'SOP Vault', icon: BookOpen },
    { id: 'tools', label: 'Automation Tools', icon: PenTool },
    { id: 'calendar', label: 'Admin Calendar', icon: Calendar },
    { id: 'setup', label: 'Mobile App Setup', icon: Smartphone },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen text-slate-300 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-orange-500 p-2 rounded-lg">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-none">RuffBot</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Virtual COO</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                : 'hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      <div className="p-6 bg-slate-800/50 mt-auto">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Platform Production Live</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">
            RS
          </div>
          <div>
            <p className="text-sm font-semibold text-white">RuffStuff Admin</p>
            <p className="text-xs text-slate-400">Practice Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
