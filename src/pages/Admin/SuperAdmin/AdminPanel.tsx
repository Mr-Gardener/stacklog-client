import TopBar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
