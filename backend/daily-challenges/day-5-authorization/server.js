require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const { protect } = require("./authMiddleware");
const Post = require("./Post");

const app = express();
app.use(express.json());

const PORT = process.env.DAY5_PORT || 5005;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("[Day 5] Connected to MongoDB"))
  .catch((err) => {
    console.error("[Day 5] DB error:", err.message);
    process.exit(1);
  });

// Create a post owned by the authenticated user
app.post("/api/posts", protect, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// Edit a post: allowed only for the post owner OR an admin
app.put("/api/posts/:id", protect, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error:
          "Forbidden: only the post author or an admin can edit this post.",
      });
    }

    if (typeof req.body.title === "string" && req.body.title.trim()) {
      post.title = req.body.title.trim();
    }
    if (typeof req.body.content === "string" && req.body.content.trim()) {
      post.content = req.body.content.trim();
    }

    await post.save();
    res.json({
      message: isAdmin && !isOwner ? "Post updated by admin" : "Post updated",
      post,
    });
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`[Day 5] Server running on http://localhost:${PORT}`);
});
