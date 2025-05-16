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
            <h1 className="text-">STACKLOG</h1>
            <NavBar />
            <p>Welcome to the StackLog Blog <br /> 
            StackLog is an educative Blog that scsics;l skdskcsp skcmscspool</p>

            <h4>Get Started</h4>

            <section>
                <article>
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