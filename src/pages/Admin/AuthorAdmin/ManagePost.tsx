import { useEffect, useState } from "react";
import api from "../../../api/Axios";
import { Link } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  status: "published" | "draft";
  updatedAt: string;
}

const AuthorPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

useEffect(() => {
    api.get("/posts/my-posts")
    .then((res) => {
      setPosts(res.data);
    })
    .catch((err) => {
      console.error("❌ Error fetching posts:", err.response?.data || err.message);
    });
}, []);


  const filteredPosts = posts.filter((post) =>
    filter === "all" ? true : post.status === filter
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">My Posts</h2>
        <Link
          to="/admin/author/create-post"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          + New Post
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        {["all", "published", "draft"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-4 py-1 rounded ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {type[0].toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Last Updated</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post._id} className="border-t dark:border-gray-700">
                <td className="p-3">{post.title}</td>
                <td className="p-3 capitalize">{post.status}</td>
                <td className="p-3">{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td className="p-3 flex gap-2">
                  <Link
                    to={`/admin/author/posts/edit/${post._id}`}
                    className="text-purple-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filteredPosts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorPosts;
