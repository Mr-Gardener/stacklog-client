import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FilePlus, Users, MessageSquare, Settings,
  User, LogOut, Moon, Sun
} from "lucide-react";
import api from "../../../api/Axios"
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";


const Sidebar = () => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const [pendingCount, setPendingCount] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Update paths dynamically based on the user's role
  const commentPath = user?.role === "superAdmin" ? "/admin/super/manage-comments" : "/admin/author/my-posts-comments";
  const profilePath = user?.role === "superAdmin" ? "/admin/super/profile" : "/admin/author/profile";
  const DashboardPath = user?.role === "superAdmin" ? "/admin/super/admin-dashboard" : "/admin/author/author-dashboard";
  const PostPath = user?.role === "superAdmin" ? "/admin/super/manage-authors-posts" : "/admin/author/manage-my-posts";

  const navItems = [
    { name: "Dashboard", path: DashboardPath, icon: LayoutDashboard },
    { name: "Posts", path: PostPath, icon: FilePlus },
    { name: "Manage Authors", path: "/admin/super/manage-authors", icon: Users },
    { name: "Manage Comments", path: commentPath, icon: MessageSquare, badge: pendingCount },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Fetch pending count and profile data only if user exists
    if (user) {
      api.get("/comments/pending-count")
        .then((res) => setPendingCount(res.data.pendingCount || 0))
        .catch((err) => console.error("Failed to fetch count", err));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      localStorage.clear(); 
      window.location.href = "/"; 
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed.");
    }
  };

  const handleViewProfile = () => {
    navigate(profilePath);
    setIsSettingsOpen(false);
  };

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm pt-6 px-4 hidden md:flex flex-col justify-between">
      {/* Top: Site Name */}
      <div className="text-xl font-bold text-purple-600 dark:text-purple-300 mb-4 px-2">
        Stacklog
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 text-sm font-medium mb-[110px]">
        {navItems.map(({ name, path, icon: Icon, badge }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-100 text-purple-700 dark:bg-purple-900 dark:text-blue-200 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4" />
              <span>{name}</span>
            </div>
            {typeof badge === "number" && badge > 0 && name === "Manage Comments" && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isSettingsOpen ? "▲" : "▼"}
            </span>
          </button>

          {isSettingsOpen && (
            <div className="mt-2 ml-6 space-y-1">
              <button
                onClick={handleViewProfile}
                className="flex items-center gap-2 px-4 py-2 text-left text-sm w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition"
              >
                <User size={16} /> View Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-left text-sm w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600 dark:hover:text-white transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-3 text-gray-700 hover:text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg dark:text-gray-300 dark:hover:text-purple-600 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Profile Info */}
        <div className="flex mb-1 items-center gap-3 px-3 py-2">
          <img
            src={user?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name || "Loading..."}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role || "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
