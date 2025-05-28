import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState(""); // Only needed for admin registration
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const payload: any = { email, password };

    // Add secret and role for admin registration
    if (!isLogin && secret) {
      payload.secret = secret;
      payload.role = "admin";
    }

    try {
      const res = await axios.post(import.meta.env.VITE_API_BASE + endpoint, payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/create-post");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded space-y-4 w-[300px]">
        <h2 className="text-xl font-bold text-center">{isLogin ? "Login" : "Register"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {!isLogin && (
          <input
            type="text"
            placeholder="Admin Secret (leave blank if author)"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        )}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="text-sm text-center text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
