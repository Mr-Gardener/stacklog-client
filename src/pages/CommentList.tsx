import { useEffect, useState  } from "react";
import axios from "axios";

interface Comment {
    _id: string;
    authorName: string;
    content: string;
    createdAt: string;
}

interface CommentListProps {
    postId: string;
}

const CommentList =({ postId }: CommentListProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/post/${postId}`);
                console.log("fetch comments:", res.data)
                setComments(res.data);
            } catch  (err) {
                console.error("Failed to load comments");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    if (loading) return <p>Loading comments....</p>

    if (comments.length === 0) return <p>No comments yet.</p>


    return(
        <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Comments</h3>
            {comments.map((comment) => (
                <div key={comment._id} className="p-4 border rounded">
                    <p className="font-medium">{comment.authorName}</p>
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-700">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    )
}

export default CommentList;