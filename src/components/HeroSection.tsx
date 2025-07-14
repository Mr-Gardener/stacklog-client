import { Post } from "../pages/Home";
import { Link } from "react-router-dom";

interface HeroProps {
  post: Post | null;
}

const Hero = ({ post }: HeroProps) => {
  if (!post) return null;

  return (
    <section className=" px-4 py-4 pt-25">
      <Link to={`/posts/${post._id}`} state={{ post }}>
      <div className="relative max-w-7xl mx-auto rounded-2xl shadow-md ">
        {/* background image */}
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-[347px] md:h-[500px] object-cover rounded-2xl"
        />

        {/* overlay card */}
        <div className="absolute bottom-[-40px] left-4  bg-white bg-opacity-90 p-4 dark:bg-gray-900  rounded-lg shadow-md w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%]">
          {/* Tag */}
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
            {post.tag}
          </span>

          {/* Title */}
          <h2 className="text-xl font-bold dark:text-white text-gray-900">{post.title}</h2>

          {/* Author Info */}
          <div className="flex items-center mt-2 dark:text-white gap-2">
            {post.author?.profileImage ? (
              <img
                src={post.author.profileImage}
                alt={post.author.name || "Unknown"}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-800">
                ?
              </div>
            )}
            <p className="text-sm text-gray-800">{post.author?.name || "Unknown"}</p>
          </div>

          {/* Date */}
          <p className="text-xs dark:text-white text-gray-500 mt-1">
            {new Date(post.createdAt).toDateString()}
          </p>
        </div>


      </div>
      </Link>
    </section>
  );
};

export default Hero;



