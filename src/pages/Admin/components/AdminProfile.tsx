import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AdminProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;


  const editPath =
  user?.role === "superAdmin"
    ? "/admin/super/profile/edit"
    : "/admin/author/profile/edit";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/me", {
        withCredentials: true,
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

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

  if (!profile) return <Skeleton />;

  return (
    <div className="p-6 max-w-4xl min-h-screen mx-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={profile.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
        />

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-800 dark:text-white">{profile.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-800 dark:text-white">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
              <p className="font-medium capitalize text-gray-800 dark:text-white">{profile.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Posts</p>
              <p className="font-medium text-gray-800 dark:text-white">{profile.postCount}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
              <p className="text-gray-700 dark:text-gray-200">{profile.bio || "N/A"}</p>
            </div>
          </div>

          <button
            onClick={() => navigate(editPath)}
            className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;



