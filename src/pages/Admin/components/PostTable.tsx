import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Edit, Trash2 } from "lucide-react";

type Post = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  author: { name: string; email: string };
  createdAt: string;
};

type Props = {
  status: "all" | "published" | "draft";
  filter: "all" | "mine" | "others";
};

const PostTable = ({ status, filter }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { status, filter },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };

    fetchPosts();
  }, [status, filter]);

  return (
    <div className="bg-white dark:bg-gray-900 shadow overflow-x-auto rounded-lg">
      <table className="min-w-full table-auto text-sm">
        <thead className="text-gray-600 dark:text-gray-300 border-b ">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="hidden md:table-cell">Status</th>
            <th className="hidden md:table-cell">Published</th>
            <th className="hidden lg:table-cell">Tags</th>
            <th className="hidden md:table-cell">Author</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post._id}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              <td className="p-4 max-w-xs">
                <p className="font-medium text-gray-800 dark:text-gray-100 truncate">
                  {post.title}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                  {post.content.slice(0, 40)}...
                </p>
              </td>

              <td className="hidden md:table-cell">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : post.status === "draft"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                >
                  {post.status}
                </span>
              </td>

              <td className="hidden md:table-cell text-gray-700 dark:text-gray-300">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>

              <td className="hidden lg:table-cell">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-0.5 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>
              </td>

              <td className="hidden md:table-cell text-gray-700 dark:text-gray-200">
                {post.author?.name || post.author?.email || "Unknown"}
              </td>

              <td className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <button title="Preview">
                    <Eye size={16} className="text-blue-500" />
                  </button>
                  <button title="Edit">
                    <Edit size={16} className="text-green-500" />
                  </button>
                  <button title="Delete">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;



