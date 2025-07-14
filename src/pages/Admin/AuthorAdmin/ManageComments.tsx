import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Comment {
  _id: string;
  authorName: string;
  email: string;
  content: string;
  status: string;
  createdAt: string;
  postTitle: string;
}

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    {Array(3)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="bg-gray-300 dark:bg-gray-700 h-24 rounded" />
      ))}
  </div>
);

const AuthorManageComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<"all" | "pending">("all");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/my-posts-comments`,
        { withCredentials: true }
      );
      setComments(res.data);
    } catch {
      toast.error("Failed to fetch comments.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/comments/approve/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("✅ Comment approved");
      fetchComments();
    } catch {
      toast.error("Failed to approve comment");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/comments/reject/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("❌ Comment rejected");
      fetchComments();
    } catch {
      toast.error("Failed to reject comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filtered =
    filter === "pending"
      ? comments.filter((c) => c.status === "pending")
      : comments;

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">🛠️ Manage Comments</h2>

      <div className="mb-6 flex gap-4">
        <button
          className={`px-3 py-1 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : filtered.length === 0 ? (
        <p className="text-gray-800 dark:text-gray-400">No comments found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((comment) => (
            <li
              key={comment._id}
              className="border dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
              <p className="text-base">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                — <strong>{comment.authorName}</strong> ({comment.email}) on{" "}
                <strong>{comment.postTitle}</strong>
              </p>
              <p className="text-xs text-gray-800 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>

              {comment.status === "pending" && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => handleApprove(comment._id)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(comment._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorManageComments;
