import { authService } from "../services/authService";

const retrieveUsers = async () => {
  try {
    const response = await fetch("/api/users", {
      headers: {
        ...authService.getAuthHeaders(),
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid user API response, check network tab!");
    }

    // Refresh session timeout on successful API call
    authService.refreshSession();

    return data;
  } catch (err) {
    console.error("Error from data retrieval:", err);
    return [];
  }
};

export { retrieveUsers };
