
import React from 'react';
import { Search, Plus, Filter, FileText, ChevronRight, Clock } from 'lucide-react';

const SOPVault: React.FC = () => {
  const sops = [
    { id: '1', title: 'New Client Intake Protocol', category: 'Admin', date: '2023-11-20', status: 'Active' },
    { id: '2', title: 'Insurance Denial Re-submission', category: 'Billing', date: '2023-10-15', status: 'Review Needed' },
    { id: '3', title: 'Crisis Intervention Workflow', category: 'Clinical', date: '2024-01-05', status: 'Active' },
    { id: '4', title: 'HIPAA Documentation Standards', category: 'Compliance', date: '2023-12-01', status: 'Active' },
    { id: '5', title: 'Clinician Offboarding', category: 'Admin', date: '2023-09-12', status: 'Active' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">SOP Vault</h2>
          <p className="text-slate-500">The "SOP Vault" for all practice documentation and standards.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all self-start">
          <Plus className="w-5 h-5" />
          Create New SOP
        </button>
      </header>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search procedures, categories, or keywords..." 
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
        </div>
        <button className="px-4 py-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2 font-semibold text-slate-600 hover:bg-slate-50">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Procedure Title</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Last Updated</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sops.map((sop) => (
              <tr key={sop.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800">{sop.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{sop.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {sop.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    sop.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {sop.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-orange-500 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SOPVault;
