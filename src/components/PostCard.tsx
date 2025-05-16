// a reusable component that displays one blog post preview (like title, date, maybe a short description, and a "Read more" link).

import { FC } from "react";
import { Link} from "react-router-dom";

type PostCardProps = {
    id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
};

const PostCard: FC<PostCardProps> = ({ id, title, excerpt, coverImage, tags}) => {

    return(
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {coverImage && (
                <img src={coverImage} alt={title} className="w-full h-48 object-cover"/>
            )}
            <div className="p-4">
                <Link to={`/posts/${id}`} 
                state={{ post: {_id: id, title, excerpt, coverImage, tags} }}
                >
                <h2 className="text-xl font-semibold text-blue-700 hover:underline">{title}</h2>
                </Link>
                <p className="text-gray-600 mt-2 line-clamp-3">{excerpt.slice(0, 50)}.....</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) =>(
                        <span
                        key={tag}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    )
};

export default PostCard;