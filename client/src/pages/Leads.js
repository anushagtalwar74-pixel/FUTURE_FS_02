import { useState } from "react";
import { Plus, Search, Trash2, X, Calendar, MessageCircle } from "lucide-react";

export default function Leads() {
const [leads, setLeads] = useState([
  {
    name: "Anusha Reddy",
    email: "anusha@gmail.com",
    status: "Converted",
    notes: "Wants enterprise CRM plan for team",
    followUp: "2026-06-28",
    activity: ["Lead created", "Demo completed", "Payment done"]
  },
  {
    name: "Priya Sharma",
    email: "priya@gmail.com",
    status: "Contacted",
    notes: "Interested but comparing competitors",
    followUp: "2026-06-25",
    activity: ["Email sent", "Follow-up call scheduled"]
  },
  {
    name: "Rahul Mehta",
    email: "rahul.mehta@gmail.com",
    status: "New",
    notes: "Downloaded brochure from website",
    followUp: "2026-06-30",
    activity: ["Lead captured from website"]
  },
  {
    name: "Sneha Iyer",
    email: "sneha.iyer@gmail.com",
    status: "Contacted",
    notes: "Asked for pricing details",
    followUp: "2026-06-26",
    activity: ["WhatsApp message sent"]
  },
  {
    name: "Karan Patel",
    email: "karan.patel@gmail.com",
    status: "Converted",
    notes: "Signed yearly subscription",
    followUp: "2026-07-01",
    activity: ["Demo", "Negotiation", "Closed deal"]
  },
  {
    name: "Vikram Singh",
    email: "vikram@gmail.com",
    status: "New",
    notes: "Startup founder, needs CRM for sales team",
    followUp: "2026-06-29",
    activity: ["Website signup"]
  },
  {
    name: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    status: "Contacted",
    notes: "Requested free trial extension",
    followUp: "2026-06-27",
    activity: ["Trial started", "Support call done"]
  },
  {
    name: "Arjun Rao",
    email: "arjun.rao@gmail.com",
    status: "Lost",
    notes: "Chose competitor due to pricing",
    followUp: "",
    activity: ["Demo completed", "Lost deal"]
  },
  {
    name: "Divya Nair",
    email: "divya.nair@gmail.com",
    status: "New",
    notes: "Marketing agency lead",
    followUp: "2026-07-02",
    activity: ["Landing page signup"]
  },
  {
    name: "Suresh Kumar",
    email: "suresh.kumar@gmail.com",
    status: "Converted",
    notes: "Enterprise client onboarding completed",
    followUp: "2026-07-05",
    activity: ["Meeting", "Contract signed", "Onboarded"]
  }
]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "New",
    notes: "",
    followUp: ""
  });

  const filtered = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const addLead = () => {
    if (!form.name || !form.email) return;

    setLeads([
      ...leads,
      {
        ...form,
        activity: ["Lead created"]
      }
    ]);

    setForm({ name: "", email: "", status: "New", notes: "", followUp: "" });
    setOpen(false);
  };

  const deleteLead = (index) => {
    setLeads(leads.filter((_, i) => i !== index));
  };

  const badgeColor = (status) => {
    if (status === "Converted") return "bg-green-500/20 text-green-400";
    if (status === "Contacted") return "bg-blue-500/20 text-blue-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Leads Pipeline</h1>
          <p className="text-gray-400 text-sm">CRM with Activity + Notes + Follow-ups</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 text-black px-4 py-2 rounded-xl font-semibold"
        >
          <Plus size={16} /> Add Lead
        </button>
      </div>

      {/* ACTIVITY SUMMARY DASHBOARD */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-[#111A2E] p-4 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total Leads</p>
          <h2 className="text-2xl font-bold">{leads.length}</h2>
        </div>

        <div className="bg-[#111A2E] p-4 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Converted</p>
          <h2 className="text-2xl font-bold text-green-400">
            {leads.filter(l => l.status === "Converted").length}
          </h2>
        </div>

        <div className="bg-[#111A2E] p-4 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Follow-ups</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {leads.filter(l => l.followUp).length}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-[#111A2E] p-3 rounded-xl border border-white/10">
        <Search size={16} className="text-gray-400" />
        <input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none w-full"
        />
      </div>

      {/* TABLE */}
      <div className="bg-[#111A2E] rounded-2xl overflow-hidden border border-white/10">

        <table className="w-full text-left">

          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Follow-up</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((lead, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                onClick={() => setSelected(lead)}
              >
                <td className="p-4">{lead.name}</td>
                <td>{lead.email}</td>

                <td>
                  <span className={`px-3 py-1 text-xs rounded-full ${badgeColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>

                <td className="text-gray-300 flex items-center gap-2">
                  <Calendar size={14} />
                  {lead.followUp || "Not set"}
                </td>

                <td className="p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteLead(i);
                    }}
                    className="text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* DETAIL VIEW (CRM STYLE) */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center"
          onClick={() => setSelected(null)}>

          <div className="bg-[#111A2E] p-6 rounded-2xl w-[420px] border border-white/10 space-y-4">

            <h2 className="text-xl font-bold">{selected.name}</h2>
            <p className="text-gray-400">{selected.email}</p>

            {/* NOTES */}
            <div className="bg-black/30 p-3 rounded-xl">
              <p className="text-sm text-gray-400">Notes</p>
              <p>{selected.notes || "No notes added"}</p>
            </div>

            {/* FOLLOW UP */}
            <div className="flex items-center gap-2 text-sm text-yellow-400">
              <Calendar size={14} />
              Follow-up: {selected.followUp || "Not set"}
            </div>

            {/* ACTIVITY TIMELINE */}
            <div>
              <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                <MessageCircle size={14} /> Activity Timeline
              </p>

              <div className="space-y-2">
                {(selected.activity || []).map((a, i) => (
                  <div key={i} className="text-sm bg-white/5 p-2 rounded-lg">
                    {a}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-[#111A2E] p-6 rounded-2xl w-[400px] space-y-3 border border-white/10">

            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Add Lead</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <input className="w-full p-2 bg-black/40 rounded"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input className="w-full p-2 bg-black/40 rounded"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input className="w-full p-2 bg-black/40 rounded"
              placeholder="Notes"
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <input type="date" className="w-full p-2 bg-black/40 rounded"
              onChange={(e) => setForm({ ...form, followUp: e.target.value })}
            />

            <select
              className="w-full p-2 bg-black/40 rounded"
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
            </select>

            <button
              onClick={addLead}
              className="w-full bg-cyan-500 text-black py-2 rounded-xl font-bold"
            >
              Save Lead
            </button>

          </div>

        </div>
      )}

    </div>
  );
}