
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, CreditCard, TrendingUp, BookCheck, ArrowUpRight, ArrowDownRight, Zap, Smartphone, Info, ChevronRight, Share, AlertTriangle } from 'lucide-react';

const data = [
  { name: 'Mon', clients: 24, billing: 1200 },
  { name: 'Tue', clients: 28, billing: 1400 },
  { name: 'Wed', clients: 32, billing: 1600 },
  { name: 'Thu', clients: 30, billing: 1500 },
  { name: 'Fri', clients: 26, billing: 1300 },
];

const productivityData = [
  { name: 'Wk 1', efficiency: 78 },
  { name: 'Wk 2', efficiency: 82 },
  { name: 'Wk 3', efficiency: 85 },
  { name: 'Wk 4', efficiency: 91 },
];

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between min-w-0">
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2.5 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center text-[10px] font-black uppercase tracking-tight ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
        {change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
        {Math.abs(change)}%
      </div>
<div>
  <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-wider truncate">
    {title}
  </h3>

  <p className="text-2xl font-black text-slate-900 mt-0.5 tracking-tight">
    {value}
  </p>
</div>

</div>
);

const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">COO Command Suite</h2>
          <p className="text-slate-500 text-xs font-medium">Real-time operational metrics for RuffStuff Counseling PLLC.</p>
        </div>
        {!isStandalone && (
          <button 
            onClick={() => setActiveTab('setup')}
            className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-200 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5" />
            Enter Full App Mode
          </button>
        )}
      </header>

      {/* COMPACT STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Active Clients" value="142" change={12} icon={Users} color="bg-blue-500" />
        <MetricCard title="Pending Billing" value="$4,280" change={-5} icon={CreditCard} color="bg-orange-500" />
        <MetricCard title="Clinician Logic" value="91%" change={8} icon={TrendingUp} color="bg-emerald-500" />
        <MetricCard title="Active SOPs" value="28" change={2} icon={BookCheck} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Tier 1 Performance</h3>
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-blue-500" />
                 <span className="text-[10px] font-bold text-slate-400">Sessions</span>
               </div>
               <div className="flex items-center gap-1.5 ml-2">
                 <div className="w-2 h-2 rounded-full bg-orange-500" />
                 <span className="text-[10px] font-bold text-slate-400">Billing</span>
               </div>
            </div>
          </div>
          <div className="h-64 w-full relative min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={0}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Bar dataKey="clients" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="billing" fill="#f97316" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Efficiency Rating</h3>
           <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md tracking-tighter">
  Target: &gt;85%
</span>
          </div>
          <div className="h-64 w-full relative min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={0}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Zap className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Tiered Strategy Active</h4>
            </div>
            <h4 className="text-lg font-black italic tracking-tight">Protect the Backbone. Guard the Slivers.</h4>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed font-medium">
              Prioritize <strong>Thriveworks Core</strong> (7AM-3PM). Strictly enforce <strong>Tier 2 Family Time</strong>. Deploy <strong>Headway</strong> for mid-day slivers (2-4 PM) and <strong>BetterHelp</strong> for late-night backfill (10 PM+).
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('chat')}
            className="w-full md:w-auto px-8 py-3 bg-orange-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20"
          >
            Consult RuffBot <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
