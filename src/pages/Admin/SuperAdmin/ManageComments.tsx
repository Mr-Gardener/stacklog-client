import { useEffect, useState } from "react";
import axios from "axios";

type Comment = {
  _id: string;
  content: string;
  authorEmail: string;
  postTitle: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

const ManageComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/comments", {
        withCredentials: true,
        params: filter !== "all" ? { status: filter } : {},
      });
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const handleApprove = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/comments/approve/${id}`,
        {},
        { withCredentials: true }
      );
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/comments/reject/${id}`,
        {},
        { withCredentials: true }
      );
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  return (
    <div className="p-4 dark:bg-gray-600 ">
      <div className="mb-4 flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt as any)}
            className={`px-4 py-1 rounded text-sm font-medium transition ${
              filter === opt
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="shadow overflow-x-auto rounded-lg animate-pulse">
          <table className="min-w-full table-auto text-sm">
            <thead className=" border-b dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-2">Post</th>
                <th className="p-2">Comment</th>
                <th className="p-2">Author</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="p-2">
                    <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-24" />
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-40" />
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-28" />
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-20" />
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-16" />
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center gap-2">
                      <div className="h-6 w-16 bg-gray-300 rounded dark:bg-gray-700" />
                      <div className="h-6 w-16 bg-gray-300 rounded dark:bg-gray-700" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="shadow overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto text-sm">
            <thead className=" border-b dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-2">Post</th>
                <th className="p-2">Comment</th>
                <th className="p-2">Author</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="p-2 text-gray-800 dark:text-gray-100">{comment.postTitle}</td>
                  <td className="p-2 text-gray-700 dark:text-gray-200">
                    {comment.content.slice(0, 50)}...
                  </td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{comment.authorEmail}</td>
                  <td className="p-2 text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 capitalize text-gray-700 dark:text-gray-300">
                    {comment.status}
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(comment._id)}
                      disabled={comment.status === "approved"}
                      className="text-green-600 hover:text-white hover:bg-green-600 border border-green-600 px-3 py-1 rounded disabled:opacity-40 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(comment._id)}
                      disabled={comment.status === "rejected"}
                      className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-3 py-1 rounded disabled:opacity-40 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-500"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageComments;

