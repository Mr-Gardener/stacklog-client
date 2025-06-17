import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/Topbar";
import Sidebar from "../components/Sidebar";         // Desktop sidebar
import MobileSidebar from "../components/MobileSideBar"; // Mobile drawer

const AdminPanel = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex relative">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar for mobile */}
      <MobileSidebar  />

      {/* Page content */}
      <div className="flex-1 w-full md:ml-64">
        <TopBar onMenuClick={toggleMobileMenu} /> {/* Pass toggle */}
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;


