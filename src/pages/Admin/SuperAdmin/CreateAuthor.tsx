import { useState } from "react";
import axios from "axios";

const CreateAuthor = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/api/admin/create-author", formData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New AuthorAdmin</h2>
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Author Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Author Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Author
        </button>
      </form>
    </div>
  );
};

export default CreateAuthor;
