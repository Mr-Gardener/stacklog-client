import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!coverImageFile) {
    alert("Please upload a cover image.");
    return;
  }

  try {
    const token = localStorage.getItem("adminToken");

    // 1. Upload image separately
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

    const imageUrl = imageUploadRes.data.url; // Backend should return the full image URL

    // 2. Send post data with image URL
    const newPost = {
      title,
      tags,
      content,
      coverImage: imageUrl,
    };

    await axios.post("http://localhost:5000/api/posts/create", newPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Post created successfully!");
  } catch (err) {
    console.error("Failed to create post", err);
    alert("Failed to create post");
  }
};


  return (
    <div className="min-h-screen p-6 lg:pl-[140px] bg-white">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full border p-2"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setCoverImageFile(file);
          }}
          required
        />

        <SimpleMDE value={content} onChange={setContent} />

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
