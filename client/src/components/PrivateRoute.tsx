
import { useAuth } from "../hooks/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }

  return children; 
};

export default PrivateRoute;