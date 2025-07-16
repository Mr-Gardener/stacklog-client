import { Outlet } from "react-router-dom";
import TopBar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSideBar";

const AuthorPanel = () => {
  return (
    <div className="flex relative">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar for mobile */}
      <MobileSidebar />

      {/* Page content */}
      <div className="flex-1 w-full md:ml-64">
        <TopBar /> {/* Removed toggle handler */}
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthorPanel;
