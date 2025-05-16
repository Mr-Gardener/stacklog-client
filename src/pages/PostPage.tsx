import { useLocation } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

  const PostPage = () => {
    
    const location = useLocation();
    const post = location.state?.post;

    if (!post) return <div className="p-4">post not found</div>

    return(
      <div className="p-6 max-w-3xl mx-auto">
        {post.coverImage &&(
          <img src={post.coverImage} alt={post.title} className="w-full mb-6 rounded-xl" />
        )}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag: string) => (
          <span key={tag} className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      <CommentForm postId={post._id} />
      <CommentList postId={post._id} />

      </div>
    );
  };

  export default PostPage;