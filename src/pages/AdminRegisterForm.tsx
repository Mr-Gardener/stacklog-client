import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        email,
        password,
        secret: import.meta.env.VITE_ADMIN_SECRET,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Admin account created!");
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to register admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white shadow-lg p-6 rounded w-[350px]">
        <h2 className="text-xl font-semibold mb-4">Create Admin (One-Time)</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border mb-3 px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border mb-3 px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Admin Secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border mb-3 px-3 py-2 rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default AdminRegisterForm;
