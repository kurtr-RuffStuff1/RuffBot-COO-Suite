
import React, { useState } from 'react';
import { Target, Globe, Instagram, Youtube, Users, CheckCircle2, Circle, Sparkles, Loader2, Copy, Check, CalendarDays, ExternalLink, Presentation, BookOpen, ShieldCheck, Zap, MessageSquare, Briefcase } from 'lucide-react';
import { generateActionableContent } from '../services/geminiService';

const GrowthEngine: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    try {
      const output = await generateActionableContent(`Strategic Request: ${type}. Topic: ${prompt || 'General visibility'}`, 'MARKETING');
      setResult(output);
    } catch (e) {
      setResult("The Marketing Sub-COO encountered an error. Re-aligning strategy...");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Marketing & Practice Development</h2>
          <p className="text-slate-500">Virtual COO Delegation: Strategic Growth Department.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-orange-500 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/20">
            <Briefcase className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Delegated to Marketing Sub-COO</span>
          </div>
        </div>
      </header>

      {/* Strategic Brief Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800">Target: MT Telehealth</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Leveraging Montana-specific regulations to position RuffStuff as a compliant, accessible provider for private pay and insurance statewide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800">Target: NW Montana</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hyper-local engagement in Kalispell. Partnering with Chambers of Commerce and local businesses to build regional visibility.
              </p>
            </div>
          </div>

          {/* Sub-COO Interaction Area */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden border-t-4 border-t-orange-500">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-900 text-white rounded-lg">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Consult Marketing Director</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Strategic Planning Session</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[100px] text-sm font-medium"
                placeholder="Describe a goal: e.g., 'Draft a Chamber of Commerce workshop proposal on Trauma-Informed Workplace Culture'..."
              />

              <div className="flex flex-wrap gap-2">
                <button onClick={() => handleGenerate('Social Media Batch (Instagram/Reels)')} className="flex-1 min-w-[120px] p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all flex flex-col items-center gap-1 group">
                  <Instagram className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Social Batch</span>
                </button>
                <button onClick={() => handleGenerate('YouTube Script & Repurpose Plan')} className="flex-1 min-w-[120px] p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all flex flex-col items-center gap-1 group">
                  <Youtube className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">YouTube/Video</span>
                </button>
                <button onClick={() => handleGenerate('Community Workshop Proposal')} className="flex-1 min-w-[120px] p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all flex flex-col items-center gap-1 group">
                  <Presentation className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Chamber Plan</span>
                </button>
                <button onClick={() => handleGenerate('Local Press Release Draft')} className="flex-1 min-w-[120px] p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all flex flex-col items-center gap-1 group">
                  <BookOpen className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Publicity</span>
                </button>
              </div>

              {result && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-orange-500" />
                      Strategic Asset Ready
                    </span>
                    <button onClick={handleCopy} className="text-[10px] font-bold text-slate-600 hover:text-orange-500 flex items-center gap-1">
                      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy Text'}
                    </button>
                  </div>
                  <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto border-l-4 border-l-orange-500">
                    {result}
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sub-COO is architecting campaign...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Strategy Pillars Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-6">Strategic Content Pillars</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold mb-1">Trauma-Informed Care</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Focusing on safety, trustworthiness, and peer support foundations.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold mb-1">Military Culture Integration</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Bridging the gap between clinical practice and military experience.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold mb-1">Telehealth Compliance</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Positioning as Montana's premier accessible provider.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
               <CalendarDays className="w-4 h-4 text-orange-500" />
               Implementation Tips
             </h4>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                 <span className="text-[11px] font-medium text-slate-600">Batch content creation monthly to save dev time.</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                 <span className="text-[11px] font-medium text-slate-600">Repurpose YouTube content into blog posts and reels.</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                 <span className="text-[11px] font-medium text-slate-600">Track engagement metrics to refine monthly outreach.</span>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthEngine;
