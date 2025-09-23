import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/Axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${id}`);
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags?.join(", ") || "");
      } catch (err) {
        console.error("Failed to fetch post", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/api/posts/${id}`,
        {
          title,
          content,
          tags: tags.split(",").map((t) => t.trim()),
        });
      navigate("/admin/super/manage-authors-posts");
    } catch (err) {
      console.error("Failed to update post", err);
    }
  };

  if (loading) return <p className="p-4">Loading post...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
          rows={8}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Post
        </button>
      </div>
    </div>
  );
};

export default EditPost;
