import { User } from "../models/user.js";
import { Op } from "sequelize";

export const deleteTestUser = async () => {
  try {
    const result = await User.destroy({
      where: {
        [Op.or]: [{ username: "testuser" }, { email: "test@example.com" }],
      },
    });
    console.log(`Deleted ${result} test user(s)`);
  } catch (error) {
    console.error("Error deleting test user:", error);
    throw error;
  }
}; 