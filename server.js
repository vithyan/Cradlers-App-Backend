const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authroutes");
const deviceRoutes = require("./routes/deviceRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const healthRoutes = require("./routes/healthRoutes");
const cameraRoutes = require("./routes/cameraRoutes");
const musicRoutes = require("./routes/musicRoutes");
const swingRoutes = require("./routes/swingRoutes");
const versionRoutes = require("./routes/versionRoutes"); // ✅ Included from backup branch
const deviceSettingsRoutes = require("./routes/deviceSettingsRoutes"); // ✅ Included from Main branch

require("dotenv").config();

// Initialize Express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
