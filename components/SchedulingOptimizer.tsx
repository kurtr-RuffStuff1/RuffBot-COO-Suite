
import React from 'react';
import { Lock, ShieldCheck, Heart } from 'lucide-react';

const platforms = [
  { name: 'Thriveworks', tier: 'Tier 1 (Core)', notes: 'Owner of the backbone.' },
  { name: 'Family Time', tier: 'Tier 2 (Protected)', notes: 'Hard Boundary. No clinical work.' },
  { name: 'Headway', tier: 'Tier 3 (Platform)', notes: 'Best for 2-4 PM gaps.' },
  { name: 'BetterHelp', tier: 'Tier 3 (Flex)', notes: '10 PM+ reliably fills.' },
];

const scheduleData = {
  Monday: [
    { time: '7a-3p', label: 'Thriveworks', tier: 1 },
    { time: '3p-8p', label: 'Family Time', tier: 2 },
    { time: '8p-10p', label: 'Thriveworks', tier: 1 },
    { time: '10p-12a', label: 'BetterHelp', tier: 3 },
  ],
  Tuesday: [
    { time: '1:30p-2:15p', label: 'BetterHelp', tier: 3 },
    { time: '2p-4p', label: 'Headway', tier: 3 },
    { time: '4p-5p', label: 'OFF (Buffer)', tier: 'buffer' },
    { time: '5p-8p', label: 'Family Time', tier: 2 },
    { time: '8p-10p', label: 'Thriveworks', tier: 1 },
    { time: '10p-11p', label: 'BetterHelp', tier: 3, optional: true },
  ],
  Wednesday: [
    { time: '7a-2:30p', label: 'Thriveworks', tier: 1 },
    { time: '2:30p-3p', label: 'Headway', tier: 3 },
    { time: '3p-7:30p', label: 'Family Time', tier: 2 },
    { time: '7:30p-10p', label: 'Thriveworks', tier: 1 },
  ],
  Thursday: [
    { time: '7a-3:30p', label: 'Thriveworks', tier: 1 },
    { time: '3:30p-4p', label: 'Headway', tier: 3 },
    { time: '4p-8p', label: 'Family Time', tier: 2 },
    { time: '8p-10p', label: 'Thriveworks', tier: 1 },
    { time: '10p-11p', label: 'BetterHelp', tier: 3, optional: true },
  ],
  Friday: [
    { time: '7a-3:30p', label: 'Thriveworks', tier: 1 },
    { time: '3:30p-4p', label: 'Headway', tier: 3 },
    { time: '4p-8p', label: 'Family Time', tier: 2 },
    { time: '8p-10p', label: 'Thriveworks', tier: 1 },
    { time: '10p-11p', label: 'BetterHelp', tier: 3, optional: true },
  ],
  Saturday: [
    { time: '..-8p', label: 'Family Time', tier: 2 },
    { time: '8p-10p', label: 'Thriveworks', tier: 1 },
    { time: '10p-11p', label: 'BetterHelp', tier: 3, optional: true },
  ],
  Sunday: [{ time: 'All Day', label: 'Family Time', tier: 2 }],
};

const getTierColor = (tier: number | string) => {
  switch (tier) {
    case 1: return 'bg-blue-500 border-blue-400';
    case 2: return 'bg-emerald-500 border-emerald-400';
    case 3: return 'bg-orange-500 border-orange-400';
    default: return 'bg-slate-400 border-slate-300';
  }
};

const ScheduleBlock: React.FC<{ block: any }> = ({ block }) => (
  <div className={`p-3 rounded-xl text-white ${getTierColor(block.tier)} shadow-md relative overflow-hidden border-t-2`}>
    <p className="text-[10px] font-black uppercase tracking-widest">{block.time}</p>
    <p className="text-xs font-bold mt-1">{block.label}</p>
    {block.optional && <span className="absolute top-1 right-1 text-[8px] uppercase bg-white/20 px-1 rounded-full">Optional</span>}
  </div>
);

const SchedulingOptimizer: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <header>
        <h2 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase">Optimization Protocol</h2>
        <p className="text-slate-500 text-sm font-medium">Strategic Tier-Based Multi-Platform Logic.</p>
      </header>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest">
            <Lock className="w-4 h-4 text-orange-500" />
            Strategic Tier Hierarchy
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">RuffStuff Backbone V3.1</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p, i) => (
            <div key={i} className={`p-4 ${i < platforms.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''} border-slate-100`}>
              <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${p.tier.includes('Protected') ? 'bg-emerald-100 text-emerald-600' : p.tier.includes('Core') ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                {p.tier}
              </span>
              <p className="font-black text-slate-900 italic mt-2">{p.name}</p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">{p.notes}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-6 text-center">Weekly Strategy Map</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {Object.entries(scheduleData).map(([day, blocks]) => (
            <div key={day} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-center font-black text-xs text-slate-500 uppercase tracking-widest pb-3 mb-3 border-b border-slate-200">{day}</p>
              <div className="space-y-2">
                {blocks.map((block, i) => <ScheduleBlock key={i} block={block} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-emerald-900 text-white rounded-3xl border border-emerald-800 shadow-lg relative overflow-hidden flex items-center gap-6">
         <div className="absolute top-0 right-0 p-4 opacity-10">
           <Heart className="w-24 h-24" />
         </div>
         <div className="relative z-10 p-4 bg-white/10 rounded-full">
            <ShieldCheck className="w-8 h-8 text-emerald-300" />
         </div>
         <div className="relative z-10">
           <h4 className="text-sm font-black uppercase italic">Sustainability Lock Activated</h4>
           <p className="text-xs text-emerald-100 leading-relaxed font-medium mt-1">
             Tier 2 Family Time is a non-negotiable hard boundary that prevents burnout. RuffBot will never suggest overflow sessions in these blocks.
           </p>
         </div>
      </div>
    </div>
  );
};

export default SchedulingOptimizer;
