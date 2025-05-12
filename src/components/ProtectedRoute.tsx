import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../hooks/withAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
};

export default ProtectedRoute;
