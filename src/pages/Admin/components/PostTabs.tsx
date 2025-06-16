

type Props = {
  status: "all" | "published" | "draft";
  setStatus: (value: "all" | "published" | "draft") => void;
};

const PostTabs = ({ status, setStatus }: Props) => {
  const tabs = ["all", "published", "draft"];

  return (
    <div className="flex space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setStatus(tab as any)}
          className={`px-3 py-1 rounded-full capitalize ${
            status === tab
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default PostTabs;