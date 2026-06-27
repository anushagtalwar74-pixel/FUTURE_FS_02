import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Sparkles, LogIn } from "lucide-react";
import axios from "axios";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  setLoading(true);

  try {
    const res = await axios.post(
      "https://future-fs-02-backend-enos.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

    console.log("LOGIN SUCCESS:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    login(res.data.user.email);

    alert("Login successful");
  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data);

    alert(
      err.response?.data?.msg ||
      err.response?.data?.message ||
      "Invalid login"
    );
  }

  setLoading(false);
};

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden bg-[#070A12]">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* CARD */}
      <div className="relative w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" />
            </div>
          </div>

          <h1 className="text-white text-2xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Sign in to CRM Dashboard
          </p>
        </div>

        {/* EMAIL INPUT */}
        <div className="mb-4">
          <label className="text-xs text-gray-400">Email</label>
          <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-lg p-3 mt-1">
            <Mail size={16} className="text-gray-400" />
            <input
              className="bg-transparent w-full outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* PASSWORD INPUT */}
        <div className="mb-6">
          <label className="text-xs text-gray-400">Password</label>
          <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-lg p-3 mt-1">
            <Lock size={16} className="text-gray-400" />
            <input
              type="password"
              className="bg-transparent w-full outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-bold p-3 rounded-lg hover:scale-[1.02] transition disabled:opacity-60"
        >
          <LogIn size={18} />
          {loading ? "Signing in..." : "Login to Dashboard"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Secure • Fast • AI Powered CRM
        </p>

      </div>
    </div>
  );
}