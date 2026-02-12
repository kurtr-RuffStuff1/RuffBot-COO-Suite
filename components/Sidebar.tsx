
import React from 'react';
import { LayoutDashboard, MessageSquare, BookOpen, PenTool, Calendar, ShieldCheck, TrendingUp, Smartphone, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
  const navItems = [
    { id: 'dashboard', label: 'COO Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'RuffBot Chat', icon: MessageSquare },
    { id: 'growth', label: 'Marketing & Growth', icon: TrendingUp },
    { id: 'sop', label: 'SOP Vault', icon: BookOpen },
    { id: 'tools', label: 'Automation Tools', icon: PenTool },
    { id: 'calendar', label: 'Admin Calendar', icon: Calendar },
    { id: 'clients', label: 'Clients', icon: Users },
  ];

  return (
    <aside className={`bg-slate-900 h-screen text-slate-300 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-6 border-b border-slate-800 flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="bg-orange-500 p-2 rounded-lg flex-shrink-0">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div className={`transition-all duration-200 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <h1 className="text-white font-bold text-lg leading-none whitespace-nowrap">RuffBot</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest whitespace-nowrap">Virtual COO</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              // Auto-collapse sidebar on selection to maximize content view
              if (!isCollapsed) {
                setIsCollapsed(true);
              }
            }}
            title={isCollapsed ? item.label : undefined}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${isCollapsed ? 'justify-center' : ''} ${
              activeTab === item.id 
                ? 'bg-slate-800/50 text-white' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
            }`}
          >
            {activeTab === item.id && (
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 transition-all duration-300 ${isCollapsed ? 'h-1.5 w-1.5 left-2.5 rounded-full' : 'h-5 w-1 rounded-r-full'}`} />
            )}
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className={`font-semibold text-sm whitespace-nowrap transition-all duration-200 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className={`overflow-hidden transition-all duration-200 ${isCollapsed ? 'h-0 opacity-0' : 'h-auto opacity-100 mb-4'}`}>
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white ring-2 ring-slate-800 flex-shrink-0">
              RS
            </div>
            <div>
              <p className="text-sm font-semibold text-white whitespace-nowrap">RuffStuff Admin</p>
              <p className="text-xs text-slate-400 whitespace-nowrap">Practice Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">
                  All Systems Operational
              </span>
          </div>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronsRight className="w-5 h-5 text-slate-400" /> : <ChevronsLeft className="w-5 h-5 text-slate-400" />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
