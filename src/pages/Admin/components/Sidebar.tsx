import { NavLink } from "react-router-dom";
import { LayoutDashboard, FilePlus, Users, MessageSquare, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {

  const [pendingCount, setPendingCount] = useState<number>(0);

  const navItems = [
  { name: "Dashboard", path: "/admin/super/admin-dashboard", icon: <LayoutDashboard size={16} /> },
  { name: "Posts", path: "/admin/super/manage-authors-posts", icon: <FilePlus size={16} /> },
  { name: "Create Authors", path: "/admin/super/create-authors", icon: <Users size={16} /> },
  { name: "Manage Comments", path: "/admin/super/manage-comments", icon: <MessageSquare size={16} /> },
  { name: "Manage Authors", path: "/admin/super/manage-authors", icon: <UserCog size={16} /> },
];

useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios
      .get("http://localhost:5000/api/comments/pending-count", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPendingCount(res.data.pendingCount))
      .catch((err) => console.error("Failed to fetch count", err));
  }, []);

  return (
    <aside className="w-64 h-screen overflow-y-auto bg-white shadow-md fixed top-0 left-0 pt-20 px-4">
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ name, path, icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `text-gray-700 font-medium px-3 py-2 rounded-md hover:bg-blue-100 ${
                isActive ? "bg-blue-100 text-blue-700" : ""
              }`
            }
          >
            {icon}
<span className="ml-2">{name}</span>
            {/* {name} */}
          </NavLink>
        ))}

        {pendingCount > 0 && (
          <span className="bg-red-500 text-white rounded-full px-2 text-xs">
            {pendingCount}
          </span>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
