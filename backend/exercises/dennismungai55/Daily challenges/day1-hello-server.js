const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to CommunityHub API" });
});

app.get("/about", (req, res) => {
  res.json({
    name: "CommunityHub",
    version: "1.0.0",
    page: "About CommunityHub",
  });
});

app.get("/api/time", (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    unix: Date.now(),
  });
});

app.listen(PORT, () => {
  console.log(`Day 1 server running on http://localhost:${PORT}`);
});
