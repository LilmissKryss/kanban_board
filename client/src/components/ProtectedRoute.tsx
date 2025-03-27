import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!authService.isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Refresh the session timeout on any protected route access
  authService.refreshSession();

  return <>{children}</>;
};

export default ProtectedRoute; 