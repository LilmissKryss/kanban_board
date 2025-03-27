import { JwtPayload, jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  username: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

class AuthService {
  private static TOKEN_KEY = 'kanban_token';
  private static USER_KEY = 'kanban_user';

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data: AuthResponse = await response.json();
      this.setToken(data.token);
      this.setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async register(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data: AuthResponse = await response.json();
      this.setToken(data.token);
      this.setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  static loggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return this.isAuthenticated() && !this.isTokenExpired(token);
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload & { exp: number }>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export default AuthService;
