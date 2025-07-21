import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  _id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface CommentListProps {
  postId: string;
}

const CommentList = ({ postId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/post/${postId}`);
        console.log("✅ Fetched comments response:", res.data);
        setComments(res.data); // Ensure this is an array
      } catch (err) {
        console.error("❌ Failed to load comments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  if (loading) {
    return (
      <div className="space-y-4 mt-8">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse p-4 border rounded-md bg-gray-100 dark:bg-gray-800"
          >
            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/4 mb-2 rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 w-3/4 mb-1 rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return <p className="mt-6 text-gray-500 dark:text-gray-300">No comments yet.</p>;
  }

  return (
    <div className="my-10 py-8 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Comments</h3>
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-gray-800 dark:text-gray-100">{comment.authorName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
          <p className="text-gray-800 dark:text-gray-300">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;