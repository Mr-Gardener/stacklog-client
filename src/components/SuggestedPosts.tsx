import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Author {
  name?: string;
  profileImage?: string;
}

 interface Post {
  _id: string;
  title: string;
  coverImage: string;
  author?: Author
  tags?: string[];
  createdAt: string;
}

const SuggestedPosts = ({ currentPostId }: { currentPostId: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/suggestions/${currentPostId}`
        );
        setPosts(res.data.suggestions);
      } catch (err) {
        console.error("Failed to load suggestions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, [currentPostId]);

  if (loading) {
    return (
      <div className="mt-16 max-w-7xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-72 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="mt-20 px-4 pb-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Read Next</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col overflow-hidden"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 flex flex-col justify-between flex-grow">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {new Date(post.createdAt).toDateString()}
              </p>

              <div className="flex items-center mt-auto">
                <img
                  src={post.author?.profileImage || "/default-avatar.png"}
                  alt={post.author?.name || "Unknown"}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {post.author?.name || "Unknown"}
                </span>
              </div>

              <Link
                to={`/posts/${post._id}`}
                className="mt-4 inline-block text-center bg-black text-white dark:bg-white dark:text-black rounded-full px-4 py-1.5 text-sm font-medium hover:scale-105 transition-transform"
              >
                Read
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestedPosts;
