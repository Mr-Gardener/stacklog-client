import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../context/AuthContext";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const editPath =
    user?.role === "superAdmin"
      ? "/admin/super/profile/edit"
      : "/admin/author/profile/edit";

  const Skeleton = () => (
    <div className="p-6 max-w-4xl mx-auto animate-pulse">
      <h2 className="text-2xl font-semibold mb-6 text-gray-300 dark:text-gray-600 bg-gray-200 dark:bg-gray-700 w-32 h-6 rounded" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700" />

        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-20 mb-2 rounded" />
              <div className="h-5 bg-gray-300 dark:bg-gray-600 w-40 rounded" />
            </div>
          ))}
          <div className="sm:col-span-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 w-20 mb-2 rounded" />
            <div className="h-5 bg-gray-300 dark:bg-gray-600 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) return <Skeleton />;

  return (
    <div className="p-6 max-w-4xl min-h-screen mx-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
        />

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-800 dark:text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
              <p className="font-medium capitalize text-gray-800 dark:text-white">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Posts</p>
              <p className="font-medium text-gray-800 dark:text-white">{user.postCount ?? "N/A"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
              <p className="text-gray-700 dark:text-gray-200">{user.bio || "N/A"}</p>
            </div>
          </div>

          <button
            onClick={() => navigate(editPath)}
            className="mt-6 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
