
import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Zap, RefreshCw } from 'lucide-react';

const SchedulingOptimizer: React.FC = () => {
  const [activeRhythm, setActiveRhythm] = useState<'WEEKLY' | 'DAILY'>('WEEKLY');

  const platforms = [
    { name: 'Thriveworks', priority: '1 (Primary)', focus: 'Morning/Early Afternoon', target: '7AM-12PM', cancel: '24h' },
    { name: 'Headway/Rula', priority: '2 (Secondary)', focus: 'Mid-day Filler', target: '12PM-2PM', cancel: '24h' },
    { name: 'Private Pay', priority: '3 (High Value)', focus: 'Late Morning/Afternoon', target: 'Varies', cancel: '24-48h' },
    { name: 'BetterHelp', priority: '4 (Flex)', focus: 'Evenings/Backfill', target: '7PM-10PM', cancel: '12h' },
  ];

  const weeklyRhythm = [
    { day: 'Sun', task: 'Calendar Audit', detail: 'Single source of truth check across all platforms.' },
    { day: 'Mon', task: 'Lock Thriveworks', detail: 'Ensure 28+ sessions are possible. Push remaining slots to Headway/Rula.' },
    { day: 'Wed', task: 'Cancel Audit', detail: 'Push Wednesday gaps to Private Pay, then BetterHelp.' },
    { day: 'Fri', task: 'Finalize Next Wk', detail: 'Finalize Thriveworks blocks. Clear unstable availability elsewhere.' },
  ];

  const dailyRhythm = [
    { time: '07-09 AM', label: 'Priority Hour', platform: 'Thriveworks Exclusive' },
    { time: '11-02 PM', label: 'Overflow / PP', platform: 'Thriveworks or Private Pay' },
    { time: '02-05 PM', label: 'Stability Block', platform: 'Rula / Headway / Insurance' },
    { time: '07-10 PM', label: 'Flex Filler', platform: 'BetterHelp Only' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Scheduling Optimizer</h2>
          <p className="text-slate-500">Multi-platform availability & booking window logic.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-emerald-600" />
             <span className="text-xs font-bold text-emerald-700 uppercase">Target: 28+ Sessions/Wk</span>
           </div>
        </div>
      </header>

      {/* Platform Priority Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            Platform Priority Hierarchy
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logic-Based Booking</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Prime Hours</th>
                <th className="px-6 py-4">Cancel Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {platforms.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-800">{p.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${i === 0 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                      {p.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-600 font-medium">
                      <p>{p.focus}</p>
                      <p className="text-slate-400 font-normal">{p.target}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {p.cancel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Planning Rhythm */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveRhythm('WEEKLY')}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg transition-colors ${activeRhythm === 'WEEKLY' ? 'bg-orange-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setActiveRhythm('DAILY')}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg transition-colors ${activeRhythm === 'DAILY' ? 'bg-orange-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Daily
                </button>
              </div>
              <RefreshCw className="w-4 h-4 text-slate-500" />
            </div>

            <div className="space-y-6">
              {activeRhythm === 'WEEKLY' ? (
                weeklyRhythm.map((r, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold group-hover:border-orange-500 transition-colors">
                        {r.day}
                      </div>
                      {i !== weeklyRhythm.length - 1 && <div className="w-px h-full bg-slate-800 my-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">{r.task}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{r.detail}</p>
                    </div>
                  </div>
                ))
              ) : (
                dailyRhythm.map((r, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="text-[10px] font-mono text-slate-500 w-16 pt-0.5">{r.time}</div>
                    <div className="pb-4">
                      <p className="text-xs font-bold text-white flex items-center gap-2">
                        {r.label}
                        <ArrowRight className="w-3 h-3 text-orange-500" />
                      </p>
                      <p className="text-[11px] text-slate-400 italic">{r.platform}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
             <div className="flex items-center gap-2 mb-3">
               <AlertCircle className="w-5 h-5 text-blue-600" />
               <h4 className="text-sm font-bold text-blue-900">Booking Insight</h4>
             </div>
             <p className="text-xs text-blue-700 leading-relaxed font-medium">
               Thriveworks strongly favors clinicians who keep consistent weekly blocks. BetterHelp should be used as a last-minute backfill (Evenings).
             </p>
          </div>
        </div>

        {/* Right Col: Interactive Visual Planner Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]">
           <Calendar className="w-16 h-16 text-slate-200 mb-4" />
           <h3 className="text-lg font-bold text-slate-800">Availability Visualizer</h3>
           <p className="text-sm text-slate-500 max-w-sm text-center mt-2 mb-8">
             Interactive platform mapping is calculated based on the priority hierarchy. 
             Use the Chat interface for specific "What if?" scheduling scenarios.
           </p>
           
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md">
             {['Mon', 'Tue', 'Wed', 'Thu'].map(day => (
               <div key={day} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{day}</p>
                 <div className="h-2 w-full bg-orange-200 rounded-full mb-1" title="Priority 1: Thrive" />
                 <div className="h-2 w-full bg-blue-200 rounded-full mb-1" title="Priority 2: Headway" />
                 <div className="h-2 w-full bg-slate-200 rounded-full" title="Priority 4: BetterHelp" />
               </div>
             ))}
           </div>
           
           <button className="mt-8 flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all">
             <CheckCircle2 className="w-5 h-5" />
             Audit Platform Synch
           </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulingOptimizer;
