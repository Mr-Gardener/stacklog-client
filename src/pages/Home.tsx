//fetch and list all blog posts

import AvailabilityBadge from "../components/AvailabilityBadge";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sideBar";
import MenuBar from "../components/menuBar";



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
            <MenuBar />
            <div className="relative">
               <AvailabilityBadge />
               {/* ...rest of the homepage */}
            </div>
         
             {/* <div className="lg:ml-[150px] my-30">
                <h2 className=" text-justify text-4xl font-bold pb-3">Work Hard. <br /> <span className="ml-27">Work Smart</span></h2>
                  <p className="text-justify text-gray-700">Stacklog is where Engineering meets tactical problem solving. <br />
                Watch me cut through the noise, build with clarity and grow with impact.
                </p>
             </div> */}

              <section className="my-20 lg:ml-[135px] lg:mr-[1rem]">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
    
                {/* Text Section */}
                <div className="max-w-xl  text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d]">
                    Work Hard. <br />
                    <span className="text-[#77533a]">Work Smart.</span>
                  </h1>
                  <p className="mt-4 text-gray-700 text-base md:text-lg">
                    Stacklog is where engineering meets tactical problem solving.<br />
                    Watch me cut through the noise, build with clarity and grow with impact.
                  </p>
                </div> 

                {/* Optional Image or Illustration */}
                <div className="hidden lg:block flex-shrink-0">
                  <img
                    src="/your-image.svg"
                    alt="Developer illustration"
                    className="w-64 h-auto rounded-xl shadow-md"
                  />
                </div>

              </div>
            </section>


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