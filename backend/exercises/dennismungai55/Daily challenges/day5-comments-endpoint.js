const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

const posts = [
  {
    id: 1,
    title: "First Community Post",
    comments: [
      {
        id: 101,
        author: "alice",
        text: "Great post!",
        createdAt: "2026-11-01T12:00:00Z",
      },
    ],
  },
];
let nextCommentId = 102;

function findPost(idParam) {
  return posts.find((p) => p.id === Number(idParam));
}

app.get("/api/posts/:id/comments", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post.comments);
});

app.post("/api/posts/:id/comments", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
  const author =
    typeof req.body.author === "string" && req.body.author.trim()
      ? req.body.author.trim()
      : "anonymous";

  if (!text) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  const comment = {
    id: nextCommentId++,
    author,
    text,
    createdAt: new Date().toISOString(),
  };
  post.comments.push(comment);
  res.status(201).json(comment);
});

app.delete("/api/posts/:id/comments/:commentId", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const commentId = Number(req.params.commentId);
  const index = post.comments.findIndex((c) => c.id === commentId);
  if (index === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }

  post.comments.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Day 5 Comments API running on http://localhost:${PORT}`);
});
