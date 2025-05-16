import { useState  } from "react";
import axios from "axios";

interface CommentFormProps {
    postId: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
    const [authorName, setAuthorName] = useState("");
    const [content, setContent] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
      

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/api/comments/${postId}`, {postId, authorName, content});
            setSubmitted(true);
            setAuthorName("");
            setContent("");
            setError("");
        } catch (err: any) {
            setError("failed to submit comment.");
        }
    };

    if (submitted) {
        return <p className="text-green-700">Comment submitted and awaiting approval</p>
    }

    


    return(
        <div>
            <button
                onClick={() => setShowForm(!showForm)}
                className="text-blue-600 flex items-center gap-2"
            >🗨️ Comment
            </button>

            {showForm && (
        <div className="mt-4 transition-all duration-300">
          {/* Your comment form component or JSX here */}
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
             {error && <p className="text-red-600">{error}</p>}
             <input 
             type="text"
             placeholder="Your name" 
             value={authorName}
             onChange={(e) => setAuthorName(e.target.value)}
             required
             className="border p-2 w-full rounded"
             />

             <textarea 
             placeholder="Your comment"
             value={content}
             onChange={(e) => setContent(e.target.value)}
             required
             className="border p-2 w-full rounded"
             />

             <button
             type="submit"
             className="bg-blue-600 text-white px-4 py-2 rounded"
             >
                 Submit Comment
             </button>
         </form>
        </div>
      )}
        </div>
    )
}

export default CommentForm;