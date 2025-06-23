import Navbar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/HeroSection";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";

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
      <PostCard />
       {/* `  end of blog list` */}
     {/* Footer start */}
      <Footer />
      {/* Footer start */}
    </div>
  );
};

export default Home;

