import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/Axios";
import { X } from "lucide-react";

interface Post {
  _id: string;
  title: string;
}

const SearchOverlay = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const fetchResults = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/posts/search?q=${query}`
          );
          setResults(res.data);
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-md">
      <div className="w-full max-w-3xl mx-auto mt-32 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Search</h2>

        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading && <p className="mt-4 text-gray-800">Searching...</p>}

        {!loading && query && results.length === 0 && (
          <p className="mt-4 text-gray-800">No results found.</p>
        )}

        {results.length > 0 && (
          <ul className="mt-4 space-y-3">
            {results.map((post) => (
              <li key={post._id}>
                <Link
                  to={`/posts/${post._id}`}
                  onClick={onClose}
                  className="block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
