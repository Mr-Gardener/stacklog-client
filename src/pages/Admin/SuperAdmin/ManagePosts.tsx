import { useState } from "react";
import PostTable from "../components/PostTable";
import { useNavigate } from "react-router-dom";

const ManageAuthorPosts = () => {
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [filter, setFilter] = useState<"all" | "mine" | "others">("all");

  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 py-6 text-gray-800 dark:bg-gray-600 dark:text-gray-100">

      {/* Status Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {["all", "published", "draft"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s as any)}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all
              ${
                status === s
                  ? "bg-blue-100 text-blue-700 border-blue-600 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-400"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
              }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Filter + New Post */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 rounded px-3 py-2 w-full sm:w-auto"
        >
          <option value="all">All Posts</option>
          <option value="mine">My Posts</option>
          <option value="others">Other Authors</option>
        </select>

        <button
          onClick={() => navigate("/admin/super/create-post")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded w-full sm:w-auto"
        >
          + New Post
        </button>
      </div>

      {/* Post Table */}
      <PostTable status={status} filter={filter} />
    </div>
  );
};

export default ManageAuthorPosts;



