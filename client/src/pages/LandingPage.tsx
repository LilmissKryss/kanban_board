import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { authService } from "../services/authService";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewTicketClick = () => {
    // If user is not logged in, show login modal instead of navigating
    if (!authService.isAuthenticated()) {
      setIsLoginModalOpen(true);
      return;
    }
    navigate("/new-ticket");
  };

  const validateForm = () => {
    const { username, password } = formData;

    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.login({
        username: formData.username.trim(),
        password: formData.password.trim(),
      });

      if (result.success) {
        navigate("/board");
      } else {
        setError(result.message || "Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="landing-page">
      <header className="header">
        <Link to="/" className="title-link">
          <h1 className="title">Krazy Kanban Board</h1>
        </Link>
        <div className="nav-buttons">
          <button className="btn btn-primary" onClick={handleNewTicketClick}>
            New Ticket
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </button>
        </div>
      </header>
      <main className="main-content">
        <h2 className="login-message">Login to create & view tickets</h2>
      </main>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <div className="login-modal">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                disabled={isLoading}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                disabled={isLoading}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary login-btn"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
