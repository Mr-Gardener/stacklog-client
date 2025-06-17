import { useState } from "react";
import {
  Menu,
  X,
  Settings,
  User,
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Moon,
  Sun,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", to: "/admin/super/admin-dashboard", icon: LayoutDashboard },
  { label: "Posts", to: "/admin/super/manage-authors-posts", icon: FileText },
  { label: "Authors", to: "/admin/super/manage-authors", icon: Users },
  { label: "Comments", to: "/admin/super/manage-comments", icon: MessageSquare },
];

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Simple toggle for now
  const location = useLocation();

  
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col justify-between`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Acme Inc.</h2>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-5 text-sm">
          {navLinks.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition ${
                location.pathname === to
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-800/20 dark:text-white"
                  : "text-gray-800 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-4 text-sm">
          <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition">
            <Settings className="w-4 h-4" />
            Settings
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <div className="flex items-center gap-3 mt-2">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Saltina</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;

