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
    <div id="scroll-container" data-scroll-container className="bg-white dark:bg-gray-950 min-h-screen text-black dark:text-white">
      <div data-scroll-section>
        {/* `  start of Hero section` */}
        <div className="mb-40">
          <Hero post={posts[0] ?? null} />
        </div>
        {/* `  End of Hero section` */}

        {/* `  start of blog list` */}
          <PostCard />
        {/* `  end of blog list` */}
        
      {/* Footer start */}
        <Footer />
        {/* Footer start */}
      </div>
    </div>
  );
};

export default Home;

