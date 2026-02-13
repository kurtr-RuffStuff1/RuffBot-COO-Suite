import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react";

type Props = {
  setActiveTab?: (tab: string) => void;
};

const COLORS = ["#f97316", "#0ea5e9", "#10b981", "#6366f1", "#facc15"];

const Dashboard: React.FC<Props> = () => {
  // 1) WEEKLY REVENUE PROJECTION
  const weeklyRevenue = [
    { platform: "Thriveworks", amount: 820 },
    { platform: "Headway", amount: 540 },
    { platform: "Rula", amount: 310 },
    { platform: "BetterHelp", amount: 180 },
    { platform: "Private Pay", amount: 450 },
  ];
  const totalWeeklyRevenue = weeklyRevenue.reduce((sum, p) => sum + p.amount, 0);

  // 2) PLATFORM MIX PIE CHART
  const platformMix = [
    { name: "Thriveworks", value: 42 },
    { name: "Headway", value: 28 },
    { name: "Rula", value: 18 },
    { name: "BetterHelp", value: 12 },
    { name: "Private Pay", value: 14 },
  ];

  // 3) UTILIZATION RATE
  const idealSessions = 28;
  const actualSessions = 22;
  const utilization = Math.round((actualSessions / idealSessions) * 100);

  // 4) CANCELLATIONS + NO SHOWS
  const cancellations = 3;
  const noShows = 1;

  // 5) CLINICAL COMPLIANCE
  const notesDue = 4;
  const txPlansDue = 1;

  // 6) WEEKLY SESSION TREND  ✅ (this array is now properly closed)
  const weeklySessions = [
    { week: "W1", sessions: 18 },
    { week: "W2", sessions: 22 },
    { week: "W3", sessions: 25 },
    { week: "W4", sessions: 21 },
  ];

  // 7) EXPENSE PANEL DATA
  const monthlyExpenses = [
    { category: "Software & Subscriptions", amount: 320 },
    { category: "Office & Supplies", amount: 140 },
    { category: "CEUs & Training", amount: 85 },
    { category: "Insurance (Liability/Health)", amount: 410 },
    { category: "Marketing & Listings", amount: 120 },
    { category: "Phone/Internet", amount: 165 },
  ];
  const totalMonthlyExpenses = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const weeklyProfit = totalWeeklyRevenue - totalMonthlyExpenses / 4;
  const expenseTrend = [
    { month: "Nov", expenses: 1180 },
    { month: "Dec", expenses: 1240 },
    { month: "Jan", expenses: 1310 },
    { month: "Feb", expenses: 1210 },
  ];

  const expenseRatio = Math.round((totalMonthlyExpenses / (totalWeeklyRevenue * 4)) * 100);

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <header style={{ display: "grid", gap: 6 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>COO Command Dashboard</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>
          Operational intelligence for a multi-platform practice.
        </p>
      </header>

      {/* Metric cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        <MetricCard
          title="Weekly Revenue"
          value={`$${totalWeeklyRevenue}`}
          sub="Projected across all platforms"
          icon={<DollarSign size={18} />}
        />
        <MetricCard
          title="Utilization"
          value={`${utilization}%`}
          sub={`${actualSessions} of ${idealSessions} ideal sessions`}
          icon={<TrendingUp size={18} />}
        />
        <MetricCard
          title="Cancellations / No-Shows"
          value={`${cancellations} / ${noShows}`}
          sub="Revenue leakage indicators"
          icon={<AlertTriangle size={18} />}
        />
        <MetricCard
          title="Compliance"
          value={`${notesDue} notes • ${txPlansDue} tx plans`}
          sub="Outstanding clinical tasks"
          icon={<Users size={18} />}
        />
      </section>

      {/* Charts */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 12,
        }}
      >
        <Card title="Weekly Revenue by Platform">
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRevenue}>
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Platform Mix">
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={platformMix} dataKey="value" nameKey="name" outerRadius={90} label>
                  {platformMix.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Weekly Session Trend">
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklySessions}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sessions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Expenses */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 12,
        }}
      >
        <Card title="Monthly Expense Overview">
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Stat label="Total Monthly Expenses" value={`$${totalMonthlyExpenses}`} />
              <Stat label="Weekly Profit" value={`$${weeklyProfit.toFixed(0)}`} />
              <Stat label="Expense Ratio" value={`${expenseRatio}%`} />
            </div>

            <div>
              <strong>Category Breakdown</strong>
              <ul style={{ marginTop: 8 }}>
                {monthlyExpenses.map((e) => (
                  <li key={e.category}>
                    {e.category}: ${e.amount}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Expense Trend">
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </div>
  );
};

function Card(props: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 12,
        padding: 12,
        background: "white",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>{props.title}</h3>
      {props.children}
    </div>
  );
}

function MetricCard(props: { title: string; value: string; sub: string; icon: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 12,
        padding: 12,
        background: "white",
        display: "grid",
        gap: 6,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{props.title}</strong>
        {props.icon}
      </div>
      <div style={{ fontSize: 24 }}>{props.value}</div>
      <div style={{ opacity: 0.75, fontSize: 13 }}>{props.sub}</div>
    </div>
  );
}

function Stat(props: { label: string; value: string }) {
  return (
    <div style={{ minWidth: 160 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{props.label}</div>
      <div style={{ fontSize: 18 }}>{props.value}</div>
    </div>
  );
}

export default Dashboard;
