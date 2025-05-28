import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";

const CreatePost = ()=> {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPost ={
            title, 
            tags: tags.split(",").map(tag => tag.trim()),
            coverImage, 
            content,
            author: "admin"
        };

        try {
            const token = localStorage.getItem("adminToken");
            await axios.post("https://your-api-url/api/posts", newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Post created");
        } catch (err) {
            console.error(err);
            alert("Failed to create post");
        }
    };

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post("http://localhost:5000/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            });

            const imageUrl = res.data.url;
            setCoverImage(imageUrl); // ✅ Set it as the cover image
            } catch (err) {
            console.error("Image upload failed", err);
            alert("Image upload failed");
                }
    };


    return (
        <div className="min-h-screen p-6 lg:pl-[140px] bg-white">
            <h2 className="text-2xl font-bold mb-4"> Create New Post</h2>

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
                    className="w-full border p-2 bg-gray-100"
                    placeholder="Cover Image URL"
                    value={coverImage}
                    // onChange={(e) => setCoverImage(e.target.value)}
                    readOnly
                 />

                 <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                    }}
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
