import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Create Post", path: "/admin/super/create-post" },
    { name: "Create Authors", path: "/admin/super/create-authors" },
    { name: "Manage Comments", path: "/admin/super/manage-comments" },
    { name: "Manage Authors", path: "/admin/super/manage-authors" },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 pt-20 px-4">
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `text-gray-700 font-medium px-3 py-2 rounded-md hover:bg-blue-100 ${
                isActive ? "bg-blue-100 text-blue-700" : ""
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
