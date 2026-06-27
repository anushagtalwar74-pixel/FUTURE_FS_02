import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import {
  Bell,
  User,
  Settings,
  LogOut,
  Search,
  Sparkles
} from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // 🔴 REAL-TIME NOTIFICATION COUNT
  const [notifCount, setNotifCount] = useState(3);

  const notifRef = useRef();
  const profileRef = useRef();
  const searchRef = useRef();

  const menuItems = useMemo(
    () => [
      "Open Dashboard",
      "View Leads",
      "Add New Lead",
      "Analytics Overview",
      "Reports",
      "Settings",
      "Calendar",
      "Tasks"
    ],
    []
  );

  const filtered = menuItems.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = useCallback(
    (item) => {
      setShowSearch(false);

      if (item === "Open Dashboard") navigate("/");
      else if (item === "View Leads") navigate("/leads");
      else if (item === "Add New Lead") navigate("/addlead");
      else if (item === "Analytics Overview") navigate("/analytics");
      else if (item === "Reports") navigate("/reports");
      else if (item === "Settings") navigate("/settings");
      else if (item === "Calendar") navigate("/calendar");
      else if (item === "Tasks") navigate("/tasks");
    },
    [navigate]
  );

  // 🔴 SIMULATE REAL-TIME NOTIFICATIONS
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifCount((prev) => prev + 1);
    }, 8000); // every 8 seconds new notification

    return () => clearInterval(interval);
  }, []);

  // CLOSE OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-[#0B1220] border-b border-white/10 relative">

      {/* LEFT */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          CRM Dashboard
          <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
            Pro
          </span>
        </h2>

        <p className="text-sm text-gray-400">
          Welcome {user?.name} 🚀 Manage leads & revenue
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div ref={searchRef} className="relative">
          <div className="flex items-center gap-2 bg-[#111A2E] px-3 py-2 rounded-xl border border-white/10">
            <Search size={16} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSearch(true);
              }}
              placeholder="Search CRM..."
              className="bg-transparent outline-none text-white w-40"
            />
          </div>

          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-3 w-72 bg-[#111A2E] border border-white/10 rounded-xl shadow-xl p-2 z-50"
              >
                {filtered.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleNavigate(item)}
                    className="p-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles size={14} />
                    {item}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🔔 BELL WITH REAL-TIME BADGE */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setNotifCount(0); // reset when opened
            }}
            className="relative bg-[#111A2E] p-2 rounded-xl border border-white/10"
          >
            <Bell size={18} />

            {/* 🔴 BADGE */}
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] bg-red-500 text-white rounded-full">
                {notifCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-3 w-80 bg-[#111A2E] border border-white/10 rounded-xl shadow-xl p-3 z-50"
              >
                <p className="text-white font-semibold mb-3">
                  Notifications
                </p>

                {[
                  "New lead from website",
                  "Priya moved to Contacted",
                  "₹12,000 revenue updated"
                ].map((n, i) => (
                  <div
                    key={i}
                    className="p-3 mb-2 bg-white/5 rounded-lg text-sm text-gray-300"
                  >
                    {n}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PROFILE */}
        <div ref={profileRef} className="relative">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white"
          >
            {user?.name?.charAt(0) || "A"}
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-3 w-60 bg-[#111A2E] border border-white/10 rounded-xl shadow-xl p-2 z-50"
              >
                <div className="p-3 border-b border-white/10">
                  <p className="text-white font-semibold">{user?.name}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-gray-300"
                >
                  <User size={16} /> Profile
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/settings");
                  }}
                  className="w-full flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-gray-300"
                >
                  <Settings size={16} /> Settings
                </button>

                <button
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 hover:bg-red-500/10 text-red-400 rounded-lg text-sm"
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default Navbar;