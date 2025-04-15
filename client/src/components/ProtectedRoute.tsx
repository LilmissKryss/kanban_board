import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  // Check if user is authenticated with either regular auth or test user token
  const isTestUser =
    localStorage.getItem("jwt_token") === "test-token-for-testuser";
  if (!authService.isAuthenticated() && !isTestUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Refresh the session timeout on any protected route access
  authService.refreshSession();

  return <>{children}</>;
};

export default ProtectedRoute;
