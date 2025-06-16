import Navbar from "../components/NavBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../components/HeroSection";

export interface Post {
  _id: string;
  title: string;
  coverImage: string;
  author?: {
    name: string;
    profileImage: string;
  };
  tag: string;
  createdAt: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen text-black dark:text-white">
      <Navbar />

      <Hero post={posts[0] ?? null} />

{/* `  start of blog list` */}
      <div className="px-4 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-50">
        {posts.slice(1).map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id}>
            <div className="relative group h-64 rounded-lg overflow-hidden shadow-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-end p-4 text-white">
                <span className="text-sm">{post.tag}</span>
                <h2 className="text-xl font-semibold">{post.title}</h2>

                {/* author display */}
                <div className="flex items-center space-x-2 mt-2">
                  <img
                    src={post.author?.profileImage || "/default-avatar.png"}
                    alt={post.author?.name || "Author"}
                    className="w-7 h-7 rounded-full object-cover border"
                  />
                  <span className="text-sm">
                    {post.author?.name ?? "Unknown"} • {new Date(post.createdAt).toDateString()}
                  </span>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
          {/* `  end of blog list` */}

    </div>
  );
};

export default Home;
