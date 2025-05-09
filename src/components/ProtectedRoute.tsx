import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import Spinner from "./Spinner";
import { useAuth } from "../hooks/withAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Spinner variation="screen-large" />;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
};

export default ProtectedRoute;
