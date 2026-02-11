
import React, { useState } from 'react';
import { Code, Mail, FileText, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { generateActionableContent } from '../services/geminiService';

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'SOP' | 'SCRIPT' | 'EMAIL'>('SCRIPT');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const output = await generateActionableContent(prompt, activeTool);
      setResult(output);
    } catch (e) {
      setResult("Error generating content.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tools = [
    { id: 'SCRIPT', label: 'Apps Script Generator', icon: Code, color: 'text-blue-500' },
    { id: 'EMAIL', label: 'HIPAA Email Drafter', icon: Mail, color: 'text-orange-500' },
    { id: 'SOP', label: 'SOP Architect', icon: FileText, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Administrative Tools</h2>
        <p className="text-slate-500">Rapid generation of practice assets and automation scripts.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => { setActiveTool(tool.id as any); setResult(''); setPrompt(''); }}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
              activeTool === tool.id 
                ? 'bg-white border-orange-500 shadow-sm' 
                : 'bg-slate-50 border-transparent hover:bg-slate-100'
            }`}
          >
            <div className={`p-2 rounded-lg bg-white shadow-sm`}>
              <tool.icon className={`w-5 h-5 ${tool.color}`} />
            </div>
            <span className="font-semibold text-slate-700 text-sm">{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">
            {activeTool === 'SCRIPT' ? 'Describe the automation task' : activeTool === 'EMAIL' ? 'Subject or recipient context' : 'Describe the procedure'}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[120px]"
            placeholder={activeTool === 'SCRIPT' ? "e.g., A script to email clinicians when a client is marked as 'No Show' in Sheets..." : "Enter details here..."}
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {isGenerating ? 'Analyzing Workflow...' : 'Generate Asset'}
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Generated Output</h4>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-orange-500 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied to Clipboard' : 'Copy Content'}
              </button>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
