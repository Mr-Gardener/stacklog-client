import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pencil, FileText, Clock, User } from "lucide-react";
import axios from "axios";

interface Stats {
  publishedCount: number;
  draftCount: number;
  pendingComments?: number;
  name: string;
}

const AuthorDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    publishedCount: 0,
    draftCount: 0,
    pendingComments: 0,
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/author-dashboard", {
          withCredentials: true,
        });

        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
        👋 Welcome back, {stats.name || "Author"}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 flex items-center gap-4">
          <FileText className="text-blue-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-800">Published Posts</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.publishedCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 flex items-center gap-4">
          <Clock className="text-yellow-500 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-800">Drafts</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.draftCount}</p>
          </div>
        </div>

        {/* Optional: pending comments */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 flex items-center gap-4">
          <User className="text-pink-500 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-800">Pending Comments</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.pendingComments}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mt-6">
        <Link
          to="/admin/author/create-post"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Pencil size={18} />
          New Post
        </Link>

        <Link
          to="/admin/author/profile"
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <User size={18} />
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default AuthorDashboard;
