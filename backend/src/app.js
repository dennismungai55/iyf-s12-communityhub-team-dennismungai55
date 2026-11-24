const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to CommunityHub API");
});

// API routes
app.use("/api", routes);

// 404 handler (after routes, before error handler)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler (last)
app.use(errorHandler);

module.exports = app;
