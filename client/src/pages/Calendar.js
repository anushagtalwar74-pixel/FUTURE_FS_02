import { useState, useEffect } from "react";
import { Plus, X, Calendar as CalIcon, Clock } from "lucide-react";

export default function Calendar() {
  const [events, setEvents] = useState([]);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    datetime: "",
    type: "meeting",
  });

  // ✅ LOAD saved events
  useEffect(() => {
    const saved = localStorage.getItem("crm_events");

    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      setEvents([
        {
      title: "Client Meeting - Infosys",
      datetime: "2026-06-25T10:00",
      type: "meeting",
    },
    {
      title: "Product Demo Call",
      datetime: "2026-06-26T15:00",
      type: "demo",
    },
    {
      title: "Lead Follow-up - Priya",
      datetime: "2026-06-27T12:30",
      type: "followup",
    },
    {
      title: "Sales Strategy Review",
      datetime: "2026-06-28T11:00",
      type: "meeting",
    },
    {
      title: "CRM Pipeline Review",
      datetime: "2026-06-29T09:30",
      type: "meeting",
    },
    {
      title: "Cold Leads Analysis",
      datetime: "2026-06-30T16:00",
      type: "followup",
    },
      ]);
    }
  }, []);

  // ✅ SAVE to storage
  const saveToStorage = (data) => {
    localStorage.setItem("crm_events", JSON.stringify(data));
  };

  const addEvent = () => {
    if (!form.title || !form.datetime) return;

    const updated = [{ ...form }, ...events];

    setEvents(updated);
    saveToStorage(updated); // 🔥 IMPORTANT FIX

    setForm({ title: "", datetime: "", type: "meeting" });
    setOpen(false);
  };

  const badge = (type) => {
    switch (type) {
      case "meeting":
        return "bg-green-500/20 text-green-400";
      case "demo":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-purple-500/20 text-purple-300";
    }
  };

  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CalIcon /> Smart Calendar
          </h1>
          <p className="text-gray-400 text-sm">
            Now events are permanently saved ✔
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 text-black px-4 py-2 rounded-xl font-semibold"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* EVENTS */}
      <div className="grid md:grid-cols-2 gap-4">
        {events.map((e, i) => (
          <div
            key={i}
            className="bg-[#111A2E] border border-white/10 rounded-2xl p-4"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold">{e.title}</h2>

              <span className={`px-3 py-1 text-xs rounded ${badge(e.type)}`}>
                {e.type}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
              <Clock size={14} />
              {new Date(e.datetime).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#111A2E] p-6 rounded-2xl w-[420px] space-y-4">

            <div className="flex justify-between">
              <h2 className="font-bold">Add Event</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full p-3 bg-black/40 rounded"
            />

            <input
              type="datetime-local"
              value={form.datetime}
              onChange={(e) =>
                setForm({ ...form, datetime: e.target.value })
              }
              className="w-full p-3 bg-black/40 rounded"
            />

            <button
              onClick={addEvent}
              className="w-full bg-cyan-500 text-black py-2 rounded-xl font-bold"
            >
              Save Event
            </button>

          </div>
        </div>
      )}
    </div>
  );
}