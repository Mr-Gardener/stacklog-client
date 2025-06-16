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
      withCredentials: true, // ✅ Send the cookie automatically
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
    setComments(prev => prev.filter(c => c._id !== id)); // remove from UI
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
    setComments(prev => prev.filter(c => c._id !== id)); // remove from UI
  } catch (err) {
    console.error("Reject failed", err);
  }
};


  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt as any)}
            className={`px-4 py-1 rounded ${
              filter === opt ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-700">
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
                <tr key={comment._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{comment.postTitle}</td>
                  <td className="p-2">{comment.content.slice(0, 50)}...</td>
                  <td className="p-2">{comment.authorEmail}</td>
                  <td className="p-2">{new Date(comment.createdAt).toLocaleDateString()}</td>
                  <td className="p-2 capitalize">{comment.status}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(comment._id)}
                      disabled={comment.status === "approved"}
                      className="text-green-600 hover:text-white hover:bg-green-600 border border-green-600 px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(comment._id)}
                      disabled={comment.status === "rejected"}
                      className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-3 py-1 rounded"
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
