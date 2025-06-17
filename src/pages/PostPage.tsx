import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import MenuBar from "../components/menuBar";
import Navbar from "../components/NavBar";

const PostPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!post && id) {
      const fetchPost = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
          setPost(res.data);
        } catch (err) {
          setError("Post not found");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, post]);

  if (loading) return <div className="p-4">Loading post...</div>;
  if (error || !post) return <div className="p-4 text-red-500">{error || "Post not found"}</div>;

  return (
    <div>
      <Navbar />
      {/* <MenuBar /> */}
      <div className="dark:bg-gray-950 dark:text-white px-6 max-w-3xl mx-auto pt-25">
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="w-full mb-6 rounded-xl" />
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span key={tag} className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full mb-5">
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed">{post.content}</p>

        <div className="flex items-center mt-4 space-x-2">
          <img
            src={post.author?.profileImage || "/default-avatar.png"}
            alt={post.author?.name || "Author"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-base font-medium text-gray-800">{post.author?.name}</span>
        </div>

        <CommentForm postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </div>
  );
};

export default PostPage;
