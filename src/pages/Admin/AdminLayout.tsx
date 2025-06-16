import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SuperAdminPanel from "./SuperAdmin/AdminPanel";
import AuthorAdminPanel from "./AuthorAdmin/AuthorPanel";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Loading...</div>;

  if (user.role === "superAdmin") return <SuperAdminPanel />;
  if (user.role === "authorAdmin") return <AuthorAdminPanel />;
  
  return <div >Access Denied</div>;
};



export default AdminLayout;
