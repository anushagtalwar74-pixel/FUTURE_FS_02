import { TrendingUp, Target, DollarSign, Users, Activity } from "lucide-react";

export default function Reports() {

  const stats = [
    {
      title: "Monthly Growth",
      value: "+32%",
      desc: "Leads increased this month",
      icon: <TrendingUp />,
      color: "text-cyan-400"
    },
    {
      title: "Conversion Rate",
      value: "18%",
      desc: "Better than last month",
      icon: <Target />,
      color: "text-emerald-400"
    },
    {
      title: "Revenue Impact",
      value: "₹2.4L",
      desc: "Estimated closed deals",
      icon: <DollarSign />,
      color: "text-yellow-400"
    },
    {
      title: "Active Leads",
      value: "124",
      desc: "Engaged pipeline users",
      icon: <Users />,
      color: "text-violet-400"
    }
  ];

  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Reports 📊</h1>
        <p className="text-gray-400 text-sm">
          Business intelligence & performance insights
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid md:grid-cols-4 gap-4">

        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-5 rounded-xl hover:scale-105 transition cursor-pointer"
          >
            <div className={`${item.color} mb-2`}>
              {item.icon}
            </div>

            <h2 className="text-xl font-bold">{item.value}</h2>
            <p className="text-sm text-gray-400">{item.title}</p>
            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}

      </div>

      {/* INSIGHTS PANEL */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Activity /> Performance Insight
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed">
            Your CRM pipeline is performing above industry average.
            Lead response time has improved, and conversion probability
            is increasing due to better follow-ups and segmentation.
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-violet-600 p-6 rounded-2xl text-black">
          <h2 className="font-bold text-lg mb-2">
            AI Recommendation 🚀
          </h2>

          <p className="text-sm">
            Focus on Hot Leads segment — predicted 27% higher conversion rate
            in next 7 days.
          </p>

          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg font-semibold">
            Apply Suggestion
          </button>
        </div>

      </div>

      {/* FOOTER REPORT */}
      <div className="bg-black/30 border border-white/10 p-5 rounded-xl">

        <h2 className="font-semibold mb-2">Weekly Summary</h2>

        <p className="text-gray-400 text-sm">
          • 48 new leads added<br />
          • 19 converted successfully<br />
          • 6 high-value prospects identified<br />
          • Response time improved by 40%
        </p>

      </div>

    </div>
  );
}