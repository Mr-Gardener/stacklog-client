import { useLocation } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import MenuBar from "../components/menuBar";

  const PostPage = () => {
    
    const location = useLocation();
    const post = location.state?.post;

    if (!post) return <div className="p-4">post not found</div>

    return(
      <div>
            <MenuBar />
          <div className="px-6 max-w-3xl mx-auto">
            {post.coverImage &&(
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
            <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>

          

          <CommentForm postId={post._id} />
          <CommentList postId={post._id} />

          </div>
      </div>
    );
  };

  export default PostPage;