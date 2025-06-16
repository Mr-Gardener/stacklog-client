import { useState } from "react";
import PostTable from "../components/PostTable"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const ManageAuthorPosts = () => {
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [filter, setFilter] = useState<"all" | "mine" | "others">("all");

  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 lg:pl-[140px]">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Manage Posts</h1>

      {/* Responsive Filters and New Post Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full md:w-auto">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="border px-3 py-2 rounded w-full sm:w-auto"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border px-3 py-2 rounded w-full sm:w-auto"
          >
            <option value="all">All Authors</option>
            <option value="mine">My Posts</option>
            <option value="others">Other Authors</option>
          </select>
        </div>

        <button
          onClick={() => navigate("/admin/create-post")}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
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

