import { useState } from "react";
import {
  Users,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Moon,
  Sun,
  Sparkles
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const data = [
  { month: "Jan", leads: 10 },
  { month: "Feb", leads: 15 },
  { month: "Mar", leads: 12 },
  { month: "Apr", leads: 20 },
  { month: "May", leads: 18 },
  { month: "Jun", leads: 25 }
];

const pieData = [
  { name: "Converted", value: 8 },
  { name: "Contacted", value: 15 },
  { name: "New", value: 1 }
];

const COLORS = ["#10B981", "#06B6D4", "#F97316"];

export default function Dashboard() {
  const [dark, setDark] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  const leads = [
    { name: "Anusha", email: "anusha@gmail.com", status: "Converted" },
    { name: "Priya", email: "priya@gmail.com", status: "Contacted" },
    { name: "Rahul", email: "rahul@gmail.com", status: "New" }
  ];

  const bg = dark ? "bg-[#0A0A0A]" : "bg-[#F5F5F5]";
  const card = dark ? "bg-[#18181B] text-white" : "bg-white text-black";

  return (
    <div className={`${bg} min-h-screen p-6 transition-all`}>

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">CRM Dashboard</h1>
          <p className="text-gray-400 text-sm">
            SaaS-grade analytics overview
          </p>
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 bg-[#1f1f22] rounded-lg text-white"
        >
          {dark ? <Sun /> : <Moon />}
        </button>

      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <motion.div whileHover={{ scale: 1.05 }} className={`${card} p-5 rounded-xl`}>
          <Users />
          <p className="text-gray-400 mt-2">Total Leads</p>
          <h2 className="text-2xl font-bold">24</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className={`${card} p-5 rounded-xl`}>
          <TrendingUp />
          <p className="text-gray-400 mt-2">Contacted</p>
          <h2 className="text-2xl font-bold">15</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className={`${card} p-5 rounded-xl`}>
          <CheckCircle />
          <p className="text-gray-400 mt-2">Converted</p>
          <h2 className="text-2xl font-bold">8</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className={`${card} p-5 rounded-xl`}>
          <DollarSign />
          <p className="text-gray-400 mt-2">Revenue</p>
          <h2 className="text-2xl font-bold">₹50K</h2>
        </motion.div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        <div className={`${card} p-5 rounded-xl`}>
          <h2 className="font-semibold mb-3">Lead Growth</h2>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#06B6D4" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${card} p-5 rounded-xl`}>
          <h2 className="font-semibold mb-3">Lead Status</h2>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* LEADS TABLE */}
      <div className={`${card} p-5 rounded-xl mb-6`}>

        <h2 className="font-semibold mb-4">Recent Leads</h2>

        {leads.map((lead, i) => (
          <div
            key={i}
            onClick={() => setSelectedLead(lead)}
            className="flex justify-between p-3 border-b border-gray-700 cursor-pointer hover:bg-[#27272A]"
          >
            <span>{lead.name}</span>
            <span className="text-gray-400">{lead.status}</span>
          </div>
        ))}

      </div>

      {/* UPGRADE CARD */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-cyan-600 to-violet-600 p-6 rounded-xl text-white"
      >
        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles /> Pro Upgrade
            </h2>
            <p>Unlock automation, AI insights & team CRM</p>
          </div>

          <button className="bg-white text-black px-5 py-2 rounded-lg font-bold">
            Upgrade
          </button>

        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center"
            onClick={() => setSelectedLead(null)}
          >
            <div className="bg-white text-black p-6 rounded-xl w-80">
              <h2 className="text-xl font-bold">{selectedLead.name}</h2>
              <p>{selectedLead.email}</p>
              <p>Status: {selectedLead.status}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}