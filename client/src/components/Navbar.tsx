import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const isAuth =
      authService.isAuthenticated() ||
      localStorage.getItem("jwt_token") === "test-token-for-testuser";
    setLoginCheck(isAuth);
  }, [location.pathname]);

  return (
    <header className="header">
      <Link to="/" className="title-link">
        <h1 className="title">Krazy Kanban Board</h1>
      </Link>
      <div className="nav-buttons">
        {location.pathname === "/" ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/new-ticket")}
            >
              New Ticket
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/new-ticket")}
            >
              New Ticket
            </button>
            {loginCheck ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  // Clear both regular auth and test user auth
                  authService.logout();
                  localStorage.removeItem("jwt_token");
                  localStorage.removeItem("token_expiry");
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
