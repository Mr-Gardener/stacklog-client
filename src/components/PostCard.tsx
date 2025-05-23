// a reusable component that displays one blog post preview (like title, date, maybe a short description, and a "Read more" link).

import { FC } from "react";
import { Link} from "react-router-dom";

type PostCardProps = {
    id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
    author: string;
};

const PostCard: FC<PostCardProps> = ({ id, title, excerpt, coverImage, tags}) => {

    return(
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg duration-300 flex flex-col justify-around md:flex-row">

            {coverImage && (
                <img
                src={coverImage}
                alt={title}
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                />
            )}

            <div className="p-4 flex flex-col justify-between w-full">
                <Link 
                to={`/posts/${id}`} 
                state={{ post: {_id: id, title, excerpt, coverImage, tags} }}
                >
                <h2 className="text-lg md:text-xl font-semibold text-black-700">{title}</h2>
                </Link>

                <p className="text-gray-600 mt-2 line-clamp-3 text-sm md:text-base">{excerpt.slice(0, 100)}.....</p>

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

                {/* <div className="text-sm text-gray-500 mb-2">
  By {author} • {new Date(date).toLocaleDateString()}
</div>*/}
            </div> 

        </div>
    )
};

export default PostCard;