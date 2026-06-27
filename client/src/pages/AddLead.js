import { useState } from "react";
import { Search, Plus, X, Trash2 } from "lucide-react";

export default function Leads() {

  const [leads, setLeads] = useState([
    { name: "Anusha Sharma", email: "anusha@techflow.ai", status: "Converted" },
    { name: "Priya Verma", email: "priya@startup.io", status: "Contacted" },
    { name: "Rahul Mehta", email: "rahul@leadify.com", status: "New" },
    { name: "Sneha Iyer", email: "sneha@cloudsync.ai", status: "Contacted" },
    { name: "Arjun Rao", email: "arjun@salespro.io", status: "New" },
    { name: "Karan Malhotra", email: "karan@crmhub.io", status: "Converted" },
    { name: "Neha Kapoor", email: "neha@nextgen.ai", status: "New" },
  ]);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "New"
  });

  const addLead = () => {
    if (!form.name || !form.email) return;

    setLeads([{ ...form }, ...leads]);
    setForm({ name: "", email: "", status: "New" });
    setOpen(false);
  };

  const deleteLead = (index) => {
    setLeads(leads.filter((_, i) => i !== index));
  };

  const filtered = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) => {
    switch (status) {
      case "Converted":
        return "bg-green-500/20 text-green-400";
      case "Contacted":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-yellow-500/20 text-yellow-300";
    }
  };

  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">Leads Pipeline</h1>
          <p className="text-gray-400 text-sm">
            Track, manage and convert your prospects
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          <Plus size={16} /> Add Lead
        </button>

      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-[#18181B] p-4 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total Leads</p>
          <h2 className="text-2xl font-bold">{leads.length}</h2>
        </div>

        <div className="bg-[#18181B] p-4 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Converted</p>
          <h2 className="text-2xl font-bold text-green-400">
            {leads.filter(l => l.status === "Converted").length}
          </h2>
        </div>

        <div className="bg-[#18181B] p-4 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Active Leads</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {leads.filter(l => l.status !== "Converted").length}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-[#18181B] p-3 rounded-xl border border-white/10">
        <Search size={16} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      {/* TABLE */}
      <div className="bg-[#18181B] rounded-2xl border border-white/10 overflow-hidden">

        <table className="w-full text-left">

          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((lead, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >

                <td className="p-4 font-medium">{lead.name}</td>
                <td className="text-gray-300">{lead.email}</td>

                <td>
                  <span className={`px-3 py-1 text-xs rounded-full ${statusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => deleteLead(i)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#18181B] border border-white/10 rounded-2xl w-[420px] p-6 space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Create New Lead</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 bg-black/40 rounded-lg outline-none"
            />

            <input
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 bg-black/40 rounded-lg outline-none"
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full p-3 bg-black/40 rounded-lg"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
            </select>

            <button
              onClick={addLead}
              className="w-full bg-cyan-500 text-black py-2 rounded-xl font-bold hover:scale-105 transition"
            >
              Save Lead
            </button>

          </div>

        </div>
      )}

    </div>
  );
}