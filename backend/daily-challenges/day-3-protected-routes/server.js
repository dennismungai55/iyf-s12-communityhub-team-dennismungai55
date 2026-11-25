require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const { protect } = require("./authMiddleware");

const app = express();
app.use(express.json());

const PORT = process.env.DAY3_PORT || 5003;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("[Day 3] Connected to MongoDB"))
  .catch((err) => {
    console.error("[Day 3] DB error:", err.message);
    process.exit(1);
  });

app.get("/api/public", (req, res) => {
  res.json({ message: "Public route accessible without token" });
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`[Day 3] Server running on http://localhost:${PORT}`);
});
