
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Info } from 'lucide-react';
import { sendMessageToRuffBot } from '../services/geminiService';
import { Message } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello. I'm RuffBot, your Virtual COO. I'm ready to help you optimize the operations of RuffStuff Counseling PLLC. Please remember to avoid inputting PHI. How can I streamline your workload today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToRuffBot(messages, input);
      setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I apologize, but I encountered a communication error with our administrative core. Let's try that again.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">RuffBot</h3>
            <span className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational Core Online
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          {/* Fix: Wrapped Info icon in a span to provide tooltip since Lucide components do not support 'title' prop directly */}
          <span title="Remember: No PHI" className="flex items-center cursor-help">
            <Info className="w-4 h-4" />
          </span>
          <span className="text-xs uppercase font-semibold tracking-tighter">HIPAA Mindful</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-slate-200' : 'bg-orange-500'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none whitespace-pre-wrap'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <span className="text-xs text-slate-400 font-medium italic">RuffBot is processing administrative logic...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe an administrative task or workflow..."
            className="w-full p-4 pr-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 resize-none h-14"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-center text-slate-400 uppercase tracking-widest">
          Always document new processes in the SOP Vault
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
