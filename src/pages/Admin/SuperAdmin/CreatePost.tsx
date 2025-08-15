import { useState, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { Options } from "easymde";
import api from "./../../../api/Axios"


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostSubmit = async (status: "published" | "draft") => {
    if (!coverImageFile) {
      alert("Please upload a cover image.");
      return;
    }

    try {
      setIsSubmitting(true);

      const imageFormData = new FormData();
      imageFormData.append("image", coverImageFile);

       // Upload cover image
      const imageUploadRes = await axios.post("https://stacklog-server-production.up.railway.app/api/upload", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      const imageUrl = imageUploadRes.data.url;

      const newPost = {
        title,
        tags,
        content,
        coverImage: imageUrl,
        status,
      };

      await api.post("/posts/create", newPost);

      alert(status === "draft" ? "Draft saved!" : "Post published!");
      setTitle("");
      setTags("");
      setContent("");
      setCoverImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

const mdeOptions: Options = useMemo(() => ({
  spellChecker: false,
  placeholder: "Write your post here...",
  autosave: {
    enabled: true,
    delay: 1000,
    uniqueId: "create-post-content",
  },
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    {
      name: "codeBlock",
      action: (editor: any) => {
        const cm = editor.codemirror;
        const doc = cm.getDoc();
        const pos = doc.getCursor();
        // Insert fenced code block with placeholder
        doc.replaceRange("```\n// Your code here\n```", pos);
        // Move cursor inside the block
        doc.setCursor({ line: pos.line + 1, ch: 0 });
      },
      className: "fa fa-code",
      title: "Insert code block (Ctrl+Alt+C)",
    },
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    {
      name: "image",
      action: async function customImageUpload(editor: any) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("image", file);

          try {
            const res = await axios.post(
              "https://stacklog-server-production.up.railway.app/api/upload",
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
              }
            );
            const imageUrl = res.data.url;
            const cm = editor.codemirror;
            const doc = cm.getDoc();
            const pos = doc.getCursor();
            doc.replaceRange(`![alt text](${imageUrl})`, pos);
          } catch (err) {
            console.error("Image upload failed:", err);
            alert("Image upload failed. Try again.");
          }
        };

        input.click();
      },
      className: "fa fa-image",
      title: "Upload Image",
    } as any,
    "|",
    "preview",
    "side-by-side",
    "fullscreen",
    "|",
    "guide",
  ] as any,
}), []);



  if (isSubmitting) {
    return (
      <div className="p-6 space-y-4 max-w-3xl mx-auto animate-pulse dark:text-white">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto dark:text-white">
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
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setCoverImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 rounded-md max-h-60 border dark:border-gray-600"
            />
          )}
        </div>

        <SimpleMDE value={content} onChange={setContent} options={mdeOptions} />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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