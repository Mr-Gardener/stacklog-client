import { useState, useEffect } from "react";
import {
  Menu, X, Settings, User, LogOut,
  LayoutDashboard, FileText, Users,
  MessageSquare, Moon, Sun
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const MobileSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;


const commentPath =
  user?.role === "superAdmin"
    ? "/admin/super/manage-comments"
    : "/admin/author/manage-comments";

    const profilePath =
  user?.role === "superAdmin"
    ? "/admin/super/profile"
    : "/admin/author/profile";

    const DashboardPath = 
  user?.role === "superAdmin"
    ? "/admin/super/admin-dashboard"
    : "/admin/author/author-dashboard";

  const navLinks = [
    { label: "Dashboard", to: DashboardPath, icon: LayoutDashboard },
    { label: "Posts", to: "/admin/super/manage-authors-posts", icon: FileText },
    { label: "Authors", to: "/admin/super/manage-authors", icon: Users },
    { label: "Manage Comments", to: commentPath, icon: MessageSquare, badge: pendingCount },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/comments/pending-count", { withCredentials: true })
      .then(res => setPendingCount(res.data.pendingCount || 0))
      .catch(err => console.error("Failed to fetch count", err));

    axios.get("http://localhost:5000/api/admin/me", { withCredentials: true })
      .then(res => setProfile(res.data))
      .catch(err => console.error("Failed to load sidebar profile", err));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed.");
    }
  };

  const handleViewProfile = () => {
    navigate(profilePath);
    setIsSidebarOpen(false);
    setIsSettingsOpen(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="p-2 md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col justify-between`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-300">Stacklog</h2>
          <button onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
            <X className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-5 text-sm font-medium">
          {navLinks.map(({ label, to, icon: Icon, badge }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition ${
                location.pathname === to
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-800/20 dark:text-white"
                  : "text-gray-800 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                {label}
              </div>
              {typeof badge === "number" && badge > 0 && label === "Manage Comments" && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-4 text-sm">

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSettingsOpen(prev => !prev)}
              className="flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition"
            >
              <div className="flex items-center gap-3 ">
                <Settings className="w-4 h-4" />
                Settings
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-200">
                {isSettingsOpen ? "▲" : "▼"}
              </span>
            </button>

            {isSettingsOpen && (
              <div className="mt-2 ml-6 space-y-1">
                <button
                  onClick={handleViewProfile}
                  className="flex items-center gap-2 px-4 py-2 text-left text-sm w-full rounded-lg  transition"
                >
                  <User size={16} /> View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-left text-sm w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600  dark:hover:text-white transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 mt-2">
            <img
              src={profile?.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {profile?.name || "Loading..."}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {profile?.role || "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
