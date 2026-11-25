require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./User");
const Post = require("./Post");

const app = express();
app.use(express.json());

const PORT = process.env.DAY4_PORT || 5004;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("[Day 4] Connected to MongoDB"))
  .catch((err) => {
    console.error("[Day 4] DB error:", err.message);
    process.exit(1);
  });

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// GET /api/users/me - Get current user
app.get("/api/users/me", protect, async (req, res) => {
  res.json(req.user);
});

// PUT /api/users/me - Update profile
app.put("/api/users/me", protect, async (req, res, next) => {
  try {
    const { username, bio } = req.body;
    const updates = {};
    if (typeof username === "string" && username.trim()) {
      updates.username = username.trim();
    }
    if (typeof bio === "string") {
      updates.bio = bio.trim();
    }

    const updated = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id/posts - Get user's posts
app.get("/api/users/:id/posts", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const posts = await Post.find({ author: req.params.id })
      .populate("author", "username bio role")
      .sort({ createdAt: -1 });

    res.json({ count: posts.length, posts });
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`[Day 4] Server running on http://localhost:${PORT}`);
});
