import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


export interface Post {
  _id: string;
  title: string;
  coverImage: string;
  author?: {
    name: string;
    profileImage: string;
  };
  tags?: string[];
  createdAt: string;
}

const PostCard = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="grid gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {posts.map((post) => (
        <div
          key={post._id}
          className=" bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col overflow-hidden"
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
  );
};

export default PostCard;


