import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import axios from "axios";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const handleLogin = async () => {
  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  setLoading(true);

  try {
    const user = await login(email.trim(), password.trim());

    console.log("LOGIN SUCCESS", user);

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    alert("Invalid login");
  }

  setLoading(false);
};

  return (
    <div className="h-screen flex items-center justify-center bg-[#070A12]">

      <div className="w-[420px] bg-white/5 p-8 rounded-2xl border border-white/10">

        <h1 className="text-white text-2xl mb-6 text-center">
          Login
        </h1>

        {/* EMAIL */}
        <input
          className="w-full p-3 mb-3 rounded bg-black/40 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          className="w-full p-3 mb-5 rounded bg-black/40 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-cyan-500 p-3 rounded font-bold"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

      </div>
    </div>
  );
}