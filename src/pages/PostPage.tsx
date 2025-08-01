import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import Footer from "../components/Footer";
import SuggestedPosts from "../components/SuggestedPosts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TableOfContents from "../components/TableOfContents";
import AuthorBio from "../components/AuthorBio";
import { getReadingTime } from "../utils/getReadingTime";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { generateToc, TocItem } from "../utils/generateTOC";

const PostPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState("");
  const [toc, setToc] = useState<TocItem[]>([]);

useEffect(() => {
  if (id) {
    if (location.state?.post) {
      const statePost = location.state.post;
      // Normalize tags from location.state
      if (typeof statePost.tags === "string") {
        statePost.tags = statePost.tags.split(",").map((t: string) => t.trim());
      }
      setPost(statePost);
    } else {
      setLoading(true);
      axios
        .get(`https://stacklog-server-production.up.railway.app/api/posts/${id}`)
        .then((res) => {
          const data = res.data;
          // Normalize tags from API
          if (typeof data.tags === "string") {
            data.tags = data.tags.split(",").map((t: string) => t.trim());
          }
          setPost(data);
        })
        .catch(() => setError("Post not found"))
        .finally(() => setLoading(false));
    }
  }
}, [id, location.state]);


  useEffect(() => {
    if (post?.content) {
      setToc(generateToc(post.content));
    }
  }, [post?.content]);

  if (loading) return <div className="p-4">Loading post...</div>;
  if (error || !post) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="dark:bg-gray-950 dark:text-white px-6 max-w-screen-xl mx-auto pt-24 flex flex-col lg:flex-row gap-10">
      {/* Content Section */}
      <div className="flex-1 max-w-3xl mx-auto">

        {/* title */}
        <h1 className="text-3xl font-bold mb-16">{post.title}</h1>

        {/* Cover image */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full mb-6 rounded-xl"
          />
        )}

        {/* Title & Tags */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {getReadingTime(post.content)} •{" "}
          {new Date(post.createdAt).toDateString()}
        </p>

        {/* tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-sm text-gray-800 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}


        {/* Markdown content */}
        <div className="mt-10 prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
            components={{
              h1: ({ node, ...props }) => <h1 className="scroll-mt-20" {...props} />,
              h2: ({ node, ...props }) => <h2 className="scroll-mt-20" {...props} />,
              h3: ({ node, ...props }) => <h3 className="scroll-mt-20" {...props} />,
              h4: ({ node, ...props }) => <h4 className="scroll-mt-20" {...props} />,
            }} 
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author Bio */}
        <AuthorBio author={post.author} />

        {/* Comments */}
        <CommentForm postId={post._id} />
        <CommentList postId={post._id} />

        {/* Related posts */}
        <SuggestedPosts currentPostId={post._id} />

        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <Footer />
        </div>
      </div>

      {/* TOC */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;