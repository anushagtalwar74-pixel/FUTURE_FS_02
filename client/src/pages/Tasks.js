import { useState } from "react";
import { Plus, X, CheckCircle2, Clock, ListTodo } from "lucide-react";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { title: "Design CRM UI", status: "todo" },
    { title: "Fix Leads bug", status: "progress" },
    { title: "Deploy Dashboard", status: "done" },
    { title: "Improve Navbar UX", status: "todo" },
    { title: "Add Analytics Charts", status: "progress" },
  ]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", status: "todo" });

  const addTask = () => {
    if (!form.title) return;
    setTasks([form, ...tasks]);
    setForm({ title: "", status: "todo" });
    setOpen(false);
  };

  const moveTask = (index, newStatus) => {
    const updated = [...tasks];
    updated[index].status = newStatus;
    setTasks(updated);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const getTasks = (status) =>
    tasks.filter((t) => t.status === status);

  const card = "bg-[#18181B] border border-white/10 rounded-2xl p-4";

  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ListTodo /> Task Board
          </h1>
          <p className="text-gray-400 text-sm">
            Manage workflow like a startup team
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          <Plus size={16} /> Add Task
        </button>

      </div>

      {/* BOARD */}
      <div className="grid md:grid-cols-3 gap-4">

        <Column
          title="To Do"
          icon={<Clock size={16} />}
          color="text-yellow-400"
          tasks={getTasks("todo")}
          moveTask={moveTask}
          removeTask={removeTask}
          status="todo"
          card={card}
        />

        <Column
          title="In Progress"
          icon={<ListTodo size={16} />}
          color="text-blue-400"
          tasks={getTasks("progress")}
          moveTask={moveTask}
          removeTask={removeTask}
          status="progress"
          card={card}
        />

        <Column
          title="Done"
          icon={<CheckCircle2 size={16} />}
          color="text-green-400"
          tasks={getTasks("done")}
          moveTask={moveTask}
          removeTask={removeTask}
          status="done"
          card={card}
        />

      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#18181B] border border-white/10 rounded-2xl w-[400px] p-6 space-y-4">

            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Create Task</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <input
              placeholder="Task Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 bg-black/40 rounded-lg outline-none"
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full p-3 bg-black/40 rounded-lg"
            >
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <button
              onClick={addTask}
              className="w-full bg-cyan-500 text-black py-2 rounded-xl font-bold hover:scale-105 transition"
            >
              Save Task
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/* COLUMN */
function Column({ title, icon, color, tasks, moveTask, removeTask, status, card }) {
  return (
    <div className={card}>

      <h2 className={`font-semibold mb-4 flex items-center gap-2 ${color}`}>
        {icon} {title} ({tasks.length})
      </h2>

      <div className="space-y-3">

        {tasks.map((t, i) => (
          <div
            key={i}
            className="bg-black/30 p-3 rounded-lg hover:bg-white/5 transition group"
          >

            <p className="mb-2">{t.title}</p>

            <div className="flex justify-between items-center text-xs text-gray-400">

              <div className="flex gap-2">

                {status !== "todo" && (
                  <button onClick={() => moveTask(i, "todo")}>To Do</button>
                )}

                {status !== "progress" && (
                  <button onClick={() => moveTask(i, "progress")}>Progress</button>
                )}

                {status !== "done" && (
                  <button onClick={() => moveTask(i, "done")}>Done</button>
                )}

              </div>

              <button
                onClick={() => removeTask(i)}
                className="text-red-400 opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}