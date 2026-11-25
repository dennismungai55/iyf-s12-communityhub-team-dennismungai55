require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./User");

const app = express();
app.use(express.json());

const PORT = process.env.DAY2_PORT || 5002;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("[Day 2] Connected to MongoDB"))
  .catch((err) => {
    console.error("[Day 2] DB error:", err.message);
    process.exit(1);
  });

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    if (!EMAIL_REGEX.test(String(email).trim())) {
      return res.status(400).json({ error: "Invalid email address format" });
    }

    if (String(password).length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedUsername = String(username).trim();

    const existing = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });

    if (existing) {
      return res
        .status(409)
        .json({ error: "User with that email or username already exists" });
    }

    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      role: role === "admin" ? "admin" : "user",
    });

    const token = signToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`[Day 2] Server running on http://localhost:${PORT}`);
});
