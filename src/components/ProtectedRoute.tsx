import { ReactNode } from "react";
import { Navigate } from "react-router-dom"

    interface ProtectedRouteProps {
        children: ReactNode;
        allowedRoles: string[];
    }

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") ?? "";

    if(!token || !allowedRoles.includes(role )) {
        return <Navigate to="/auth" replace />
    }

    return children;
}

export default ProtectedRoute;