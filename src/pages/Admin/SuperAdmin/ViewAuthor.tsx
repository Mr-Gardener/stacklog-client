import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Author {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profileImage?: string;
  postCount: number;
}

const ViewAuthor = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAuthor = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/authors/${id}`, {
        withCredentials: true,
      });
      setAuthor(res.data);
    } catch (err) {
      console.error("Failed to fetch author", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [id]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!author) return <div className="p-6">Author not found.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={author.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{author.name}</h2>
          <p className="text-gray-800">{author.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p><strong>Bio:</strong> {author.bio || "—"}</p>
        <p>
          <strong>Total Posts:</strong>{" "}
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {author.postCount}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ViewAuthor;