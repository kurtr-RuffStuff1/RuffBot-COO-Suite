import React, { useState } from 'react';
import { Users, Search, ChevronRight } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  platform: string;
  status: string;
  rate: string;
  lastSession: string;
}

const initialClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    platform: 'Thriveworks',
    status: 'Active',
    rate: '$85',
    lastSession: '02/10/2026'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    platform: 'Headway',
    status: 'Active',
    rate: '$72',
    lastSession: '02/09/2026'
  },
  {
    id: '3',
    name: 'Michael Brown',
    platform: 'BetterHelp',
    status: 'Paused',
    rate: '$90',
    lastSession: '01/28/2026'
  }
];

const ClientLedger: React.FC = () => {
  const [clients] = useState<Client[]>(initialClients);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.platform.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">
          Client Ledger
        </h2>
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients..."
            className="text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Platform</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Rate</th>
              <th className="p-3 text-left">Last Session</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(client => (
              <tr key={client.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-medium">{client.name}</td>
                <td className="p-3">{client.platform}</td>
                <td className="p-3">{client.status}</td>
                <td className="p-3">{client.rate}</td>
                <td className="p-3">{client.lastSession}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClient && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
            <h3 className="text-lg font-black">{selectedClient.name}</h3>
            <p className="text-sm text-slate-600">
              <strong>Platform:</strong> {selectedClient.platform}
            </p>
            <p className="text-sm text-slate-600">
              <strong>Status:</strong> {selectedClient.status}
            </p>
            <p className="text-sm text-slate-600">
              <strong>Rate:</strong> {selectedClient.rate}
            </p>
            <p className="text-sm text-slate-600">
              <strong>Last Session:</strong> {selectedClient.lastSession}
            </p>

            <button
              onClick={() => setSelectedClient(null)}
              className="w-full bg-slate-900 text-white py-2 rounded-xl font-black text-xs uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientLedger;