import  { useEffect, useState } from "react";
import axios from "axios";

interface Author {
  _id: string;
  name: string;
  email: string;
}

const ManageAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [message, setMessage] = useState("");

  const fetchAuthors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/authors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthors(res.data);
    } catch (err) {
      console.error("Error fetching authors");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/authors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Author deleted.");
      fetchAuthors(); // Refresh list
    } catch (err) {
      console.error("Delete error");
      setMessage("Could not delete author.");
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Author Admins</h2>
      {message && <p className="mb-2 text-sm text-green-600">{message}</p>}
      <ul className="space-y-3">
        {authors.map((author) => (
          <li
            key={author._id}
            className="border p-3 flex justify-between items-center rounded"
          >
            <div>
              <p className="font-medium">{author.name}</p>
              <p className="text-sm text-gray-600">{author.email}</p>
            </div>
            <button
              onClick={() => handleDelete(author._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAuthors;
