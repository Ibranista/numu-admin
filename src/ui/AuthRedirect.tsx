import { Navigate } from "react-router-dom";
import Auth from "./Auth";
import { useAuth } from "../hooks/withAuth";

const AuthRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Auth />;
};
export default AuthRedirect;
