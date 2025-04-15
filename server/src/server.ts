import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/database.js";
import routes from "./routes/index.js";
// Import models to ensure associations are set up
import "./models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Determine allowed origins based on environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://kanban-frontend.onrender.com"]
    : ["http://localhost:3000"];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// API Routes
app.use("/api", routes);

// Serve static files from the React app
const clientBuildPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientBuildPath));

// Handle React routing, return all requests to React app
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
};

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync models in the correct order to handle foreign key constraints
    // First, sync models that don't depend on other models
    await sequelize.models.User.sync({ alter: true });
    console.log("User table synced");

    // Then sync models that depend on User
    await sequelize.models.Board.sync({ alter: true });
    console.log("Board table synced");

    // Then sync models that depend on Board
    await sequelize.models.Column.sync({ alter: true });
    console.log("Column table synced");

    // Finally sync models that depend on User and Column
    await sequelize.models.Ticket.sync({ alter: true });
    console.log("Ticket table synced");

    console.log("All tables synced successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
