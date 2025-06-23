import { useState } from "react";
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

    // Upload cover image
    const imageFormData = new FormData();
    imageFormData.append("image", coverImageFile);

    const imageUploadRes = await axios.post(
      "http://localhost:5000/api/upload",
      imageFormData,
      {
        withCredentials: true, 
      }
    );

    const imageUrl = imageUploadRes.data.url;

    // Create post
    const newPost = {
      title,
      tags,
      content,
      coverImage: imageUrl,
      status,
    };

    await axios.post("http://localhost:5000/api/posts/create", newPost, {
      withCredentials: true, 
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

const testUpload = async () => {
  if (!coverImageFile) {
    alert("Choose a file first");
    return;
  }

  const formData = new FormData();
  formData.append("image", coverImageFile);

  try {
    const res = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("✅ Uploaded image URL:", res.data.url);
  } catch (err: any) {
    console.error("❌ Upload failed:", err.response?.data || err.message);
  }
};


  return (
    <div className="min-h-screen p-6 lg:pl-[140px] bg-white">
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
          accept="image/jpeg, image/jpg, image/png"
          className="w-full"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
              alert("❌ Only JPG, JPEG, and PNG files are allowed.");
              return;
            }

            setCoverImageFile(file);
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

          <button onClick={testUpload}>Test Upload</button>

        </div>
      </form>
    </div>
  );
};

export default CreatePost;
