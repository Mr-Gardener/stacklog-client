import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SuperAdminPanel from "./SuperAdmin/AdminPanel";
import AuthorAdminPanel from "./AuthorAdmin/AuthorPanel";

const AdminLayout = () => {
  const { user, loading } = useContext(AuthContext);

  // Still loading user info — show loading spinner or skeleton
  if (loading) return <div>Loading...</div>;

  // Not logged in or session expired
  if (!user) return <div>Access Denied</div>;

  // Role-based rendering
  if (user.role === "superAdmin") return <SuperAdminPanel />;
  if (user.role === "authorAdmin") return <AuthorAdminPanel />;

  return <div>Access Denied</div>;
};

export default AdminLayout;
