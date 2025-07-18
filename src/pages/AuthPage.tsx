import React, { useState, useContext } from "react";
import api from "../api/Axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState(""); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

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
      const res = await api.post(endpoint, {
        email,
        password,
        ...(isRegister && isAdmin && { secret }),
      },
        {
          withCredentials: true
        }
      );

      if (!res.data.user) {
        alert("Unexpected server response");
        return;
      }

      Cookies.set("user", JSON.stringify(res.data.user), {
      expires: 7,
      secure: false,         // false for development (use true in production)
      sameSite: "lax",       // lax is okay in dev, strict in production
    });

      setUser(res.data.user);

      const role = res.data.user.role;
      if (role === "superAdmin") {
        navigate("/admin/super/admin-dashboard");
      } else if (role === "authorAdmin") {
        navigate("/admin/author");
      } else {
        navigate("/");
      }
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
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
