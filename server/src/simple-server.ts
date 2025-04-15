import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

// Health check endpoint for Render
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Mock API endpoints
app.get("/api/tickets", (_req, res) => {
  res.json([]);
});

app.post("/api/tickets", (_req, res) => {
  res.status(201).json({ message: "Ticket created successfully" });
});

// Auth endpoints
app.post("/api/auth/login", (_req, res) => {
  res.json({
    token: "mock-token",
    user: { id: 1, username: "testuser" },
  });
});

app.post("/api/auth/register", (_req, res) => {
  res.json({
    token: "mock-token",
    user: { id: 1, username: "testuser" },
  });
});

// Legacy endpoints for backward compatibility
app.post("/api/users/login", (_req, res) => {
  res.json({
    token: "mock-token",
    user: { id: 1, username: "testuser" },
  });
});

app.post("/api/users/register", (_req, res) => {
  res.json({
    token: "mock-token",
    user: { id: 1, username: "testuser" },
  });
});

// Serve static files from the React app
const clientBuildPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientBuildPath));

// Handle React routing, return all requests to React app
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Simple server is running on port ${PORT}`);
});
