import { UserLogin } from "../interfaces/UserLogin";
import AuthService from "../utils/auth";

const login = async (userInfo: UserLogin) => {
  if (!userInfo.username || !userInfo.password) {
    throw new Error('Username and password are required');
  }

  try {
    const response = await AuthService.login(userInfo.username, userInfo.password);
    return response;
  } catch (error) {
    throw error;
  }
};

export { login };
