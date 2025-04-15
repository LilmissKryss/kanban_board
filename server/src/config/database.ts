import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelize: Sequelize;

// Check if DATABASE_URL environment variable exists (for Render deployment)
if (process.env.DATABASE_URL) {
  console.log("Using DATABASE_URL for connection");
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Important for connecting to Render's PostgreSQL
      },
    },
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  });
} else {
  // Local development configuration
  console.log("Using local database configuration");
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kanban_board",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  });
}

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default sequelize;
