//fetch and list all blog posts

import NavBar from "../components/NavBar";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    coverImage: string;
}

const Home = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get('http://localhost:5000/api/posts');
            setPosts(res.data); 
          } catch (err) {
            console.error('Failed to fetch posts:', err);
          }
        };

        fetchPosts();
      }, []);

    return(
        <main>
            <NavBar />
            <div className="max-w-2xl mx-auto">
                <h2 className="text-justify text-4xl font-bold pb-3">Work Hard. Work Smart</h2>
                <p className="text-justify text-gray-700">Stacklog is where Engineering meets tactical problem solving. <br />
                Watch me cut through the noise, build with clarity and grow with impact.
                </p>
             </div>

            <section>
                <article className="grid grid-cols-2 sm:grid-cols-1">
                    {posts.map((post) => (
                        <PostCard
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        excerpt={post.content}
                        coverImage={post.coverImage}
                        tags={post.tags}
                        />
                    ))}
                </article>
            </section>
        </main>
    );
};

export default Home;