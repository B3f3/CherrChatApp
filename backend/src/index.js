import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // ✅ Change this to your frontend domain in production
  credentials: true,
}));

// Log all incoming requests early
app.use((req, res, next) => {
  console.log("[INCOMING REQUEST]", req.method, req.originalUrl);
  next();
});

// Routes
console.log("Mounting auth routes...");
app.use("/api/auth", authRoutes);
console.log("Mounted auth routes.");

console.log("Mounting message routes...");
app.use("/api/messages", messageRoute);
console.log("Mounted message routes.");

// Static file serving in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Final fallback route (404)
app.use("*", (req, res) => {
  res.status(404).send("Not found");
});

// Start server
server.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
