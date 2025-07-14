interface Author {
  name: string;
  profileImage?: string;
  bio?: string;
}

const AuthorBio = ({ author }: { author: Author }) => {
  if (!author) return null;

  return (
    <div className="my-12 p-4 rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center gap-4">
      <img
        src={author.profileImage || "/default-avatar.png"}
        alt={author.name}
        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
      />
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
        <p className="font-medium text-lg text-gray-800 dark:text-white"><span className="text-gray-400">Written by </span>{author.name}</p>
        <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
          {author.bio || "This author hasn’t added a bio yet."}
        </p>
      </div>
    </div>
  );
};

export default AuthorBio;
