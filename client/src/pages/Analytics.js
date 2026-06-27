import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,

} from "recharts";

import {
  TrendingUp,
  Target,
  Users,
  Activity,

} from "lucide-react";

/* ---------------- DATA ---------------- */

const leadTrend = [
  { month: "Jan", leads: 10 },
  { month: "Feb", leads: 20 },
  { month: "Mar", leads: 15 },
  { month: "Apr", leads: 30 },
  { month: "May", leads: 45 },
];

const pieData = [
  { name: "Converted", value: 40 },
  { name: "Contacted", value: 35 },
  { name: "New", value: 25 }
];

const funnelData = [
  { name: "Visitors", value: 1000 },
  { name: "Leads", value: 600 },
  { name: "Qualified", value: 300 },
  { name: "Converted", value: 120 }
];

const sourceData = [
  { name: "Website", value: 40 },
  { name: "Instagram", value: 25 },
  { name: "Referral", value: 20 },
  { name: "Ads", value: 15 }
];

const COLORS = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B"];

/* ---------------- MAIN ---------------- */

export default function Analytics() {
  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard 📊</h1>
        <p className="text-gray-400 text-sm">
          Conversion funnel, lead sources & growth insights
        </p>
      </div>

      {/* KPI ROW */}
      <div className="grid md:grid-cols-4 gap-4">

        <KPI icon={<Users />} label="Total Leads" value="124" />
        <KPI icon={<TrendingUp />} label="Growth" value="+32%" />
        <KPI icon={<Target />} label="Conversion Rate" value="18%" />
        <KPI icon={<Activity />} label="Active Pipeline" value="68" />

      </div>

      {/* MAIN CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LINE CHART */}
        <ChartCard title="Lead Growth Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={leadTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#06B6D4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* PIE CHART */}
        <ChartCard title="Lead Status Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* 🔥 NEW: FUNNEL + SOURCE */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* CONVERSION FUNNEL (BAR STYLE) */}
        <ChartCard title="Conversion Funnel">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={funnelData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" radius={[10, 10, 10, 10]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* LEAD SOURCES */}
        <ChartCard title="Leads by Source">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sourceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                {sourceData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* INSIGHTS */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-semibold mb-3">📈 AI Insight</h2>
          <p className="text-gray-400 text-sm">
            Conversion improves after “Contacted” stage.
            Focus on faster follow-ups (under 24h) to increase revenue.
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl p-6 text-black">
          <h2 className="font-bold text-lg mb-2">🚀 Growth Opportunity</h2>
          <p className="text-sm">
            Instagram & Website sources are your highest converting channels.
            Increase ad budget here for max ROI.
          </p>

          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">
            Boost Campaign
          </button>
        </div>

      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function KPI({ icon, label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl hover:scale-105 transition">
      <div className="text-cyan-400">{icon}</div>
      <p className="text-gray-400 text-sm mt-2">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}