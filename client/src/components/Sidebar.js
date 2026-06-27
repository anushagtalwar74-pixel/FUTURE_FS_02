import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const main = [
    { name: "Dashboard", path: "/" },
    { name: "Analytics", path: "/analytics", badge: "AI" },
  ];

  const crm = [
    { name: "Leads", path: "/leads" },
    { name: "Add Lead", path: "/addlead" },
  ];

  const ops = [
    { name: "Calendar", path: "/calendar" },
    { name: "Tasks", path: "/tasks" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  const renderItem = (item) => {
    const active = location.pathname === item.path;

    return (
      <Link key={item.path} to={item.path}>
        <li
          className={`flex justify-between items-center p-3 rounded-xl transition cursor-pointer
          ${
            active
              ? "bg-cyan-500 text-black font-semibold"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <span>{item.name}</span>

          {item.badge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">
              {item.badge}
            </span>
          )}
        </li>
      </Link>
    );
  };

  return (
    <div className="w-64 min-h-screen bg-[#070A12] border-r border-white/10 p-6 flex flex-col">

      {/* BRAND */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">
          ⚡ Anusha CRM
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          AI-powered sales system
        </p>
      </div>

      {/* QUICK STATS */}
      <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
        <p className="text-xs text-gray-400">Today Performance</p>

        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between text-white">
            <span>Leads</span>
            <span className="text-cyan-400">24</span>
          </div>

          <div className="flex justify-between text-white">
            <span>Closed</span>
            <span className="text-green-400">8</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <ul className="space-y-2 flex-1">

        <p className="text-xs text-gray-500 mb-2">INTELLIGENCE</p>
        {main.map(renderItem)}

        <p className="text-xs text-gray-500 mt-4 mb-2">CRM</p>
        {crm.map(renderItem)}

        <p className="text-xs text-gray-500 mt-4 mb-2">OPERATIONS</p>
        {ops.map(renderItem)}

      </ul>

      {/* FOOTER */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="bg-gradient-to-r from-cyan-500 to-violet-500 p-3 rounded-xl text-black">
          <p className="text-sm font-bold">Upgrade Pro 🚀</p>
          <p className="text-xs">
            Unlock AI analytics & automation
          </p>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;