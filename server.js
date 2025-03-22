const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Route Imports
const connectDB = require("./config/db");
const authRoutes = require("./routes/authroutes");
const deviceRoutes = require("./routes/deviceRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const healthRoutes = require("./routes/healthRoutes");
const cameraRoutes = require("./routes/cameraRoutes");
const musicRoutes = require("./routes/musicRoutes");
const swingRoutes = require("./routes/swingRoutes");
const versionRoutes = require("./routes/versionRoutes");
const deviceSettingsRoutes = require("./routes/deviceSettingsRoutes");

// Initialize Express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/camera", cameraRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/swing", swingRoutes);
app.use("/api/version", versionRoutes);
app.use("/api/settings/device", deviceSettingsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  )
);
