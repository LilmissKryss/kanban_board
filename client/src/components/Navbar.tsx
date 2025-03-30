import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import auth from "../utils/auth";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  return (
    <header className="header">
      <Link to="/" className="title-link">
        <h1 className="title">Krazy Kanban Board</h1>
      </Link>
      <div className="nav-buttons">
        {location.pathname === "/" ? (
          <>
            <button className="btn btn-primary">New Ticket</button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Login
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-primary">New Ticket</button>
            {loginCheck ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  auth.logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/")}
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
