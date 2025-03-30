interface LoginResponse {
  token: string;
  user: {
    username: string;
    id: string;
  };
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  email: string;
  confirmPassword: string;
}

class AuthService {
  private tokenKey = "jwt_token";
  private tokenExpiry = "token_expiry";
  private sessionTimeout = 1000 * 60 * 60; // 1 hour
  private apiUrl = "http://localhost:3001/api";

  async register(
    credentials: RegisterCredentials
  ): Promise<{ success: boolean; message?: string }> {
    try {
      if (credentials.password !== credentials.confirmPassword) {
        return {
          success: false,
          message: "Passwords do not match",
        };
      }

      const response = await fetch(`${this.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 409:
            return {
              success: false,
              message: "Username or email already exists",
            };
          case 400:
            return {
              success: false,
              message: data.message || "Invalid registration data",
            };
          default:
            return {
              success: false,
              message: data.message || "Registration failed",
            };
        }
      }

      // If registration is successful, automatically log in
      return this.login({
        username: credentials.username,
        password: credentials.password,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "Network error. Please check your connection and try again.",
      };
    }
  }

  async login(
    credentials: LoginCredentials
  ): Promise<{ success: boolean; message?: string }> {
    try {
      if (!credentials.username || !credentials.password) {
        return {
          success: false,
          message: "Username and password are required",
        };
      }

      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: "Invalid username or password",
        };
      }

      if (!data.token) {
        return {
          success: false,
          message: "Invalid server response: No token received",
        };
      }

      const { token } = data as LoginResponse;
      this.setToken(token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpiry);
    window.location.href = "/";
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(
      this.tokenExpiry,
      (Date.now() + this.sessionTimeout).toString()
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiry = localStorage.getItem(this.tokenExpiry);

    if (!token || !expiry) {
      return false;
    }

    if (Date.now() > parseInt(expiry)) {
      this.logout();
      return false;
    }

    return true;
  }

  refreshSession(): void {
    const expiry = localStorage.getItem(this.tokenExpiry);
    if (expiry) {
      localStorage.setItem(
        this.tokenExpiry,
        (Date.now() + this.sessionTimeout).toString()
      );
    }
  }

  // Helper method to get auth headers for API requests
  getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }
}

export const authService = new AuthService();
