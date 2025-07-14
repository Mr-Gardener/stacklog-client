import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Author {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profileImage?: string;
  createdAt?: string;
  postCount: number;
}

const ManageAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortNewest, setSortNewest] = useState(true);
  const navigate = useNavigate();

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/authors", {
        withCredentials: true,
      });

      const sorted = res.data.sort((a: Author, b: Author) =>
        sortNewest && a.createdAt && b.createdAt
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime()
      );
      setAuthors(sorted);
    } catch (err) {
      console.error("Failed to fetch authors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, [sortNewest]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/super/create-authors")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm"
          >
            + Create Author
          </button>
          <button
            onClick={() => setSortNewest(!sortNewest)}
            className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            Sort: {sortNewest ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-gray-50 border-b text-left text-gray-500">
            <tr>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Posts</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b animate-pulse">
                    <td className="p-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-3 w-36 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="h-6 w-20 mx-auto bg-gray-200 rounded"></div>
                    </td>
                  </tr>
                ))
              : authors.map((author) => (
                  <tr key={author._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={author.profileImage || "/default-avatar.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border shadow"
                      />
                    </td>
                    <td className="p-3 font-medium text-gray-900">{author.name}</td>
                    <td className="p-3 text-gray-800">{author.email}</td>
                    <td className="p-3 text-gray-800">
                      {author.createdAt
                        ? format(new Date(author.createdAt), "MMM dd, yyyy")
                        : "—"}
                    </td>
                    <td className="p-3">
                      <span className="inline-block bg-blue-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {author.postCount} post{author.postCount !== 1 && "s"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => navigate(`/admin/super/authors/${author._id}`)}
                        className="text-purple-600 hover:underline text-sm"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {!loading && authors.length === 0 && (
          <div className="p-6 text-center text-gray-500">No authors found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageAuthors;

