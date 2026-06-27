import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import AddLead from "./pages/AddLead";
import Login from "./pages/Login";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  // 🔐 AUTH GATE
  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-[#0B1220] text-white">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col">

          {/* NAVBAR */}
          <Navbar />

          {/* CONTENT */}
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/addlead" element={<AddLead />} />

              {/* fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

        </div>

      </div>
    </Router>
  );
}

export default App;