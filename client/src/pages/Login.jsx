import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and Password required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid login or server not running");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#070A12]">

      <div className="w-[380px] bg-[#111A2E] border border-white/10 rounded-2xl p-8">

        <h1 className="text-white text-2xl font-bold mb-1">
          CRM Login
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Sign in to continue
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        {/* EMAIL */}
        <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg mb-3 border border-white/10">
          <Mail size={16} className="text-gray-400" />
          <input
            className="bg-transparent outline-none text-white w-full"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg mb-5 border border-white/10">
          <Lock size={16} className="text-gray-400" />
          <input
            type="password"
            className="bg-transparent outline-none text-white w-full"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-bold p-3 rounded-lg flex items-center justify-center gap-2"
        >
          <LogIn size={16} />
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}