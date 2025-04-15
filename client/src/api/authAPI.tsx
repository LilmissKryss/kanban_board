// We don't need UserLogin import anymore
import AuthService from "../utils/auth";

const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  try {
    const response = await AuthService.login({
      username,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// We don't need this alternative function anymore

export { login };
