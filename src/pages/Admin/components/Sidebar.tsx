import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  Users,
  MessageSquare,
  UserCog,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";


const Sidebar = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/super/admin-dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Posts",
      path: "/admin/super/manage-authors-posts",
      icon: FilePlus,
    },
    {
      name: "Authors",
      path: "/admin/super/create-authors",
      icon: Users,
    },
    {
      name: "Manage Comments",
      path: "/admin/super/manage-comments",
      icon: MessageSquare,
      badge: pendingCount,
    },
  ];

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/comments/pending-count", {
      withCredentials: true, // ✅ Send cookies (for session auth)
    })
    .then((res) => setPendingCount(res.data.pendingCount || 0))
    .catch((err) => console.error("Failed to fetch count", err));
}, []);


  return (
    <aside className="w-64 h-screen fixed top-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm pt-6 px-4 hidden md:flex flex-col justify-between">
      {/* Top: Site Name */}
      <div className="text-xl font-bold text-blue-600 dark:text-blue-300 mb-4 px-2">
        Acme Inc.
      </div>

      {/* Middle: Navigation */}
      <nav className="flex flex-col gap-1 text-sm font-medium flex-1">
        {navItems.map(({ name, path, icon: Icon, badge }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800"
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

      {/* Bottom: Settings, Theme Toggle, Profile */}
      <div className="flex flex-col gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 px-3 py-2 rounded transition">
          <Settings className="w-4 h-4" />
          Settings
        </button>

        <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

        <div className="flex items-center gap-3 px-3 py-2">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Saltina
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;




