import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface CommentFormProps {
  postId: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const [authorName, setAuthorName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== "") {
      setError("Spam detected");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, {
        authorName,
        email,
        content,
        website: honeypot,
      });

      toast.success("✅ Comment submitted and awaiting approval");

      // Reset form
      setAuthorName("");
      setEmail("");
      setContent("");
      setHoneypot("");
      setShowForm(false);
      setError("");
    } catch (err: any) {
      setError("Failed to submit comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="text-blue-600 flex items-center gap-2"
      >
        🗨️ Comment
      </button>

      {showForm && (
        <div className="mt-4 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {error && <p className="text-red-600">{error}</p>}

            <input
              type="text"
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />

            <textarea
              placeholder="Your comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />

            {/* 🐝 Honeypot field */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              className="hidden"
              tabIndex={-1}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-gray-400" : "bg-blue-600"
              } text-white px-4 py-2 rounded`}
            >
              {isSubmitting ? "Submitting..." : "Submit Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
