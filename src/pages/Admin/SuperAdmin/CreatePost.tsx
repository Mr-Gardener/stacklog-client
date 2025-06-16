import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostSubmit = async (status: "published" | "draft") => {
    if (!coverImageFile) {
      alert("Please upload a cover image.");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("adminToken");

      // 1. Upload cover image
      const imageFormData = new FormData();
      imageFormData.append("image", coverImageFile);

      const imageUploadRes = await axios.post(
        "http://localhost:5000/api/upload",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = imageUploadRes.data.url;

      // 2. Create post
      const newPost = {
        title,
        tags,
        content,
        coverImage: imageUrl,
        status, // either "published" or "draft"
      };

      await axios.post("http://localhost:5000/api/posts/create", newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(status === "draft" ? "Draft saved!" : "Post published!");
      setTitle("");
      setTags("");
      setContent("");
      setCoverImageFile(null);
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 lg:pl-[140px] bg-white">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePostSubmit("published");
        }}
        className="space-y-4"
      >
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setCoverImageFile(file);
          }}
          required
        />

        <SimpleMDE value={content} onChange={setContent} />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handlePostSubmit("draft")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
