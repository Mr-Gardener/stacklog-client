import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/authUtils";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const role = user ? JSON.parse(user).role : "";

  if (!token || isTokenExpired(token) || !allowedRoles.includes(role)) {
    localStorage.clear();
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;

