import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, Users, Calendar, AlertTriangle, DollarSign
} from 'lucide-react';

const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {

  // -----------------------------
  // 1. WEEKLY REVENUE PROJECTION
  // -----------------------------
  const weeklyRevenue = [
    { platform: 'Thriveworks', amount: 820 },
    { platform: 'Headway', amount: 540 },
    { platform: 'Rula', amount: 310 },
    { platform: 'BetterHelp', amount: 180 },
    { platform: 'Private Pay', amount: 450 },
  ];
  const totalWeeklyRevenue = weeklyRevenue.reduce((sum, p) => sum + p.amount, 0);

  // -----------------------------
  // 2. PLATFORM MIX PIE CHART
  // -----------------------------
  const platformMix = [
    { name: 'Thriveworks', value: 42 },
    { name: 'Headway', value: 28 },
    { name: 'Rula', value: 18 },
    { name: 'BetterHelp', value: 12 },
    { name: 'Private Pay', value: 14 },
  ];
  const COLORS = ['#f97316', '#0ea5e9', '#10b981', '#6366f1', '#facc15'];

  // -----------------------------
  // 3. UTILIZATION RATE
  // -----------------------------
  const idealSessions = 28;
  const actualSessions = 22;
  const utilization = Math.round((actualSessions / idealSessions) * 100);

  // -----------------------------
  // 4. CANCELLATIONS + NO SHOWS
  // -----------------------------
  const cancellations = 3;
  const noShows = 1;

  // -----------------------------
  // 5. CLINICAL COMPLIANCE
  // -----------------------------
  const notesDue = 4;
  const txPlansDue = 1;

  // -----------------------------
  // 6. WEEKLY SESSION TREND
  // -----------------------------
  const weeklySessions = [
    { week: 'W1', sessions: 18 },
    { week: 'W2', sessions: 22 },
    { week: 'W3', sessions: 25 },
    { week: 'W4', sessions: 21 },
  
    // -----------------------------
// 7. EXPENSE PANEL DATA
// -----------------------------
const monthlyExpenses = [
  { category: 'Software & Subscriptions', amount: 320 },
  { category: 'Office & Supplies', amount: 140 },
  { category: 'CEUs & Training', amount: 85 },
  { category: 'Insurance (Liability/Health)', amount: 410 },
  { category: 'Marketing & Listings', amount: 120 },
  { category: 'Phone/Internet', amount: 165 },
];

const totalMonthlyExpenses = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

// Weekly profit estimate
const weeklyProfit = totalWeeklyRevenue - totalMonthlyExpenses / 4;

// Expense trend (example data)
const expenseTrend = [
  { month: 'Nov', expenses: 1180 },
  { month: 'Dec', expenses: 1240 },
  { month: 'Jan', expenses: 1310 },
  { month: 'Feb', expenses: 1210 },
];
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* HEADER */}
      <header>
        <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight">
          COO Command Dashboard
        </h2>
        <p className="text-slate-500">Operational intelligence for a multi‑platform practice.</p>
      </header>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Weekly Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Weekly Revenue</h3>
            <DollarSign className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-black mt-2">${totalWeeklyRevenue}</p>
          <p className="text-xs text-slate-400 mt-1">Projected across all platforms</p>
        </div>

        {/* Utilization */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Utilization</h3>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black mt-2">{utilization}%</p>
          <p className="text-xs text-slate-400 mt-1">{actualSessions} of {idealSessions} ideal sessions</p>
        </div>

        {/* Cancellations */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Cancellations / No‑Shows</h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-black mt-2">{cancellations} / {noShows}</p>
          <p className="text-xs text-slate-400 mt-1">Revenue leakage indicators</p>
        </div>

        {/* Compliance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Compliance</h3>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-black mt-2">{notesDue} notes • {txPlansDue} tx plans</p>
          <p className="text-xs text-slate-400 mt-1">Outstanding clinical tasks</p>
        </div>

      </div>

      {/* PLATFORM MIX + WEEKLY TREND */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
{/* EXPENSE PANEL */}
<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">

  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
    Monthly Expense Overview
  </h3>

  {/* Total Expenses + Profit */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div>
      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Monthly Expenses</p>
      <p className="text-3xl font-black mt-1">${totalMonthlyExpenses}</p>
    </div>

    <div>
      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Weekly Profit</p>
      <p className="text-3xl font-black mt-1">${weeklyProfit.toFixed(0)}</p>
      <p className="text-xs text-slate-400 mt-1">After prorated expenses</p>
    </div>

    <div>
      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Expense Ratio</p>
      <p className="text-3xl font-black mt-1">
        {Math.round((totalMonthlyExpenses / (totalWeeklyRevenue * 4)) * 100)}%
      </p>
      <p className="text-xs text-slate-400 mt-1">Of monthly revenue</p>
    </div>

  </div>

  {/* Category Breakdown */}
  <div>
    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Category Breakdown</p>
    <ul className="space-y-2">
      {monthlyExpenses.map((e, i) => (
        <li key={i} className="flex justify-between text-sm">
          <span className="font-medium text-slate-700">{e.category}</span>
          <span className="font-bold text-slate-900">${e.amount}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Expense Trend Chart */}
  <div className="mt-6">
    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Expense Trend</p>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={expenseTrend}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="expenses" stroke="#0ea5e9" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
        {/* Platform Mix */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Platform Mix</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={platformMix}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {platformMix.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Sessions Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Weekly Session Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weeklySessions}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sessions" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;