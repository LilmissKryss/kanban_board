import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { Op } from "sequelize";

export const seedUsers = async () => {
  try {
    // check if test user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: "testuser" }, { email: "test@example.com" }],
      },
    });

    if (existingUser) {
      console.log("Test user exists - updating password");
      const hashedPassword = await bcrypt.hash("test123", 10);
      await existingUser.update({ password: hashedPassword });
      console.log("Test user password updated successfully");
      return;
    }

    const hashedPassword = await bcrypt.hash("test123", 10);

    await User.create({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    });

    console.log("Test user created successfully");
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "SequelizeUniqueConstraintError"
    ) {
      console.log("Test user already exists - constraint violation");
      return;
    }
    console.error("Error seeding users:", error);
    throw error;
  }
};
