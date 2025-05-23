//fetch and list all blog posts

import AvailabilityBadge from "../components/AvailabilityBadge";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sideBar";



interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    coverImage: string;
    author: string;
    date: string;
}

const Home: React.FC = () => {

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
        <main className="pt-4 px-4 lg:pl-[130px]">
            <Sidebar />
            <div className="relative">
               <AvailabilityBadge />
               {/* ...rest of the homepage */}
            </div>
         
             <div className="max-w-2xl mx-auto px-4 mb-30">
                <h2 className="text-justify text-4xl font-bold pb-3">Work Hard. <br /> <span className="ml-27">Work Smart</span></h2>
                <p className="text-justify text-gray-700">Stacklog is where Engineering meets tactical problem solving. <br />
                Watch me cut through the noise, build with clarity and grow with impact.
                </p>
             </div>

             <div className="max-w-2xl mx-auto px-4 mb-30">
                <h2 className="text-justify text-4xl font-bold pb-3">Work Hard. <br /> <span className="ml-27">See some scroll effect</span></h2>
                <p className="text-justify text-gray-700">Stacklog is where Engineering meets tactical problem solving. <br />
                Watch me cut through the noise, build with clarity and grow with impact.
                </p>
             </div>

             <div className="max-w-2xl mx-auto px-4 mb-30">
                <h2 className="text-justify text-4xl font-bold pb-3">Work Hard. <br /> <span className="ml-27">See more of it</span></h2>
                <p className="text-justify text-gray-700">Stacklog is where Engineering meets tactical problem solving. <br />
                Watch me cut through the noise, build with clarity and grow with impact.
                </p>
             </div>
             <div className="max-w-2xl mx-auto px-4 mb-30">
                <h2 className="text-justify text-4xl font-bold pb-3">Since you cant see the blog post cards <br /> <span className="ml-27">see more scroll effect at least</span></h2>
                <p className="text-justify text-gray-700">Stacklog is where Engineering meets tactical problem solving. <br />
                Watch me cut through the noise, build with clarity and grow with impact.
                </p>
             </div>
             <div className="max-w-2xl mx-auto px-4 mb-30">
                <h2 className="text-justify text-4xl font-bold pb-3">Since you cant see the blog post cards <br /> <span className="ml-27">see more scroll effect at least</span></h2>
                <p className="text-justify text-gray-700">Stacklog is where Engineering meets tactical problem solving. <br />
                Watch me cut through the noise, build with clarity and grow with impact.
                </p>
             </div>

            <section>
                <article className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl md:mx-auto mx-15">
                    {posts.map((post) => (
                        <PostCard
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        excerpt={post.content}
                        coverImage={post.coverImage}
                        tags={post.tags}
                        author={post.author}
                        />
                    ))}
                </article>
            </section>
        </main>
    );
};

export default Home;