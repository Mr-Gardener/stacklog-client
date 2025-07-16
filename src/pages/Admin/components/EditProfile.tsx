import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminEditProfile = () => {

  const navigate = useNavigate();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;


  const profilePath =
    user?.role === "superAdmin"
    ? "/admin/super/profile"
    : "/admin/author/profile";

  const [form, setForm] = useState({
    name: "",
    bio: "",
    profileImage: null as File | null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/me", { withCredentials: true })
      .then((res) => {
        setForm((prev) => ({
          ...prev,
          name: res.data.name || "",
          bio: res.data.bio || "",
        }));
      })
      .catch(() => toast.error("Failed to fetch profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, profileImage: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (form.name.trim()) formData.append("name", form.name);
    if (form.bio.trim()) formData.append("bio", form.bio);
    if (form.profileImage) formData.append("profileImage", form.profileImage);

    try {
      await axios.put("http://localhost:5000/api/admin/update", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated!");
      navigate(profilePath);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className=" max-w-2xl mx-auto mt-6 p-6 space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        ))}
        <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-full" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto min-h-screen bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 space-y-6 mt-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Edit Profile</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          className="w-full px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profile Image
        </label>
        <label className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed dark:border-gray-600 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <svg
            className="w-6 h-6 text-gray-400 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a1 1 0 001 1h3m10-2a9 9 0 10-6.219 8.625M16 12a4 4 0 01-8 0 4 4 0 018 0z"
            />
          </svg>
          <span className="text-gray-500 dark:text-gray-300">Choose a file</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {form.profileImage && (
          <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
            Selected: {form.profileImage.name}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md transition"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AdminEditProfile;


