import { Navigate } from "react-router-dom";
import Auth from "./Auth";
import { useAuth } from "../hooks/withAuth";
import Spinner from "../components/Spinner";

const AuthRedirect = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Spinner variation="screen-large" />;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Auth />;
};
export default AuthRedirect;
