import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState(""); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setIsAdmin(false);
    setSecret("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setLoading(true);
    const endpoint = isRegister ? "/auth/register" : "/auth/login";

    try {
      console.log("Sending to:", `${import.meta.env.VITE_API_URL}/auth/login`);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        email,
        password,
        ...(isRegister && isAdmin && { secret }),
        ...(isRegister && { role: isAdmin ? "admin" : "author" }),
      });

      console.log("Auth response:", res.data);

      if (!res.data.token || !res.data.user) {
        alert("Unexpected server response");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/author/create-post");
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isRegister && (
          <>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <span>Registering as Admin</span>
            </label>

            {isAdmin && (
              <input
                type="text"
                placeholder="Secret Key"
                className="w-full px-4 py-2 border rounded"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
              />
            )}
          </>
        )}

        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "processing...." : isRegister ? "Register" : "Login"}
        </button>

        <p className="text-center text-sm mt-2">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={toggleForm}
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
