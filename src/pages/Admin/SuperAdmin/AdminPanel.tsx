import { Outlet } from "react-router-dom";
import TopBar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const AdminPanel = () => {
  return (
    <div className="flex bg-gray-400">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="p-6 mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
