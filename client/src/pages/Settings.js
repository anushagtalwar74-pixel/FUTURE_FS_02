import { useState } from "react";
import { User, Shield, Bell, Trash2 } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  // PROFILE STATE
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
  });

  // PASSWORD STATE (FIXED)
  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [savedProfile, setSavedProfile] = useState(false);
  const [savedPassword, setSavedPassword] = useState(false);

  // PROFILE SAVE
  const saveProfile = () => {
    console.log("PROFILE SAVED:", profile);
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2000);
  };

  // PASSWORD UPDATE FIX
  const updatePassword = () => {
    if (!password.current || !password.newPass || !password.confirm) {
      alert("Fill all password fields");
      return;
    }

    if (password.newPass !== password.confirm) {
      alert("New passwords do not match");
      return;
    }

    console.log("PASSWORD UPDATED:", password);

    setSavedPassword(true);
    setTimeout(() => setSavedPassword(false), 2000);

    setPassword({
      current: "",
      newPass: "",
      confirm: "",
    });
  };

  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Settings ⚙️</h1>
        <p className="text-gray-400 text-sm">
          Manage your account and CRM preferences
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3">
        <Tab icon={<User size={16} />} label="Profile"
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />

        <Tab icon={<Shield size={16} />} label="Security"
          active={activeTab === "security"}
          onClick={() => setActiveTab("security")}
        />

        <Tab icon={<Bell size={16} />} label="Notifications"
          active={activeTab === "notifications"}
          onClick={() => setActiveTab("notifications")}
        />
      </div>

      {/* CONTENT */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

        {/* PROFILE */}
        {activeTab === "profile" && (
          <>
            <input
              className="w-full p-3 rounded-lg bg-black/30 outline-none"
              placeholder="Full Name"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg bg-black/30 outline-none"
              placeholder="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg bg-black/30 outline-none"
              placeholder="Company Name"
              value={profile.company}
              onChange={(e) =>
                setProfile({ ...profile, company: e.target.value })
              }
            />

            <button
              onClick={saveProfile}
              className="bg-cyan-500 text-black px-5 py-2 rounded-lg font-semibold"
            >
              Save Profile
            </button>

            {savedProfile && (
              <p className="text-green-400 text-sm">
                ✔ Profile saved successfully
              </p>
            )}
          </>
        )}

        {/* SECURITY FIXED */}
        {activeTab === "security" && (
          <>
            <input
              className="w-full p-3 rounded-lg bg-black/30 outline-none"
              placeholder="Current Password"
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg bg-black/30 outline-none"
              placeholder="New Password"
              type="password"
              value={password.newPass}
              onChange={(e) =>
                setPassword({ ...password, newPass: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg bg-black/30 outline-none"
              placeholder="Confirm Password"
              type="password"
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
            />

            <button
              onClick={updatePassword}
              className="bg-emerald-500 text-black px-5 py-2 rounded-lg font-semibold"
            >
              Update Password
            </button>

            {savedPassword && (
              <p className="text-green-400 text-sm">
                ✔ Password updated successfully
              </p>
            )}
          </>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <>
            <Toggle label="Email Notifications" />
            <Toggle label="Lead Alerts" />
            <Toggle label="Weekly Reports" />
            <Toggle label="System Updates" />
          </>
        )}

      </div>

      {/* DANGER ZONE */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Trash2 size={18} className="text-red-400" />
          <h2 className="text-red-400 font-semibold">Danger Zone</h2>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Once you delete account, it cannot be recovered.
        </p>

        <button className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold">
          Delete Account
        </button>
      </div>
    </div>
  );
}

/* TAB COMPONENT */
function Tab({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
      ${active ? "bg-cyan-500 text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
    >
      {icon}
      {label}
    </button>
  );
}

/* TOGGLE */
function Toggle({ label }) {
  const [on, setOn] = useState(false);

  return (
    <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
      <span>{label}</span>

      <button
        onClick={() => setOn(!on)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition
        ${on ? "bg-cyan-500" : "bg-gray-600"}`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition ${
            on ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}