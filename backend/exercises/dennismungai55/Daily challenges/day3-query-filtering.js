const express = require("express");
const app = express();
const PORT = process.env.PORT || 3003;

const posts = [
  {
    id: 1,
    title: "Getting Started with Node.js",
    author: "john",
    createdAt: "2026-10-01T10:00:00Z",
    likes: 12,
  },
  {
    id: 2,
    title: "Express Middleware Patterns",
    author: "jane",
    createdAt: "2026-10-05T14:30:00Z",
    likes: 25,
  },
  {
    id: 3,
    title: "Advanced Node Streams",
    author: "john",
    createdAt: "2026-10-10T09:15:00Z",
    likes: 8,
  },
];

app.get("/api/posts", (req, res) => {
  const {
    author,
    search,
    sort = "newest",
    page = "1",
    limit = "10",
  } = req.query;

  let results = [...posts];

  if (author) {
    const authorLower = String(author).toLowerCase();
    results = results.filter((p) => p.author.toLowerCase() === authorLower);
  }

  if (search) {
    const searchLower = String(search).toLowerCase();
    results = results.filter((p) =>
      p.title.toLowerCase().includes(searchLower),
    );
  }

  if (sort === "newest") {
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "oldest") {
    results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === "popular") {
    results.sort((a, b) => b.likes - a.likes);
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / limitNum));
  const start = (pageNum - 1) * limitNum;
  const data = results.slice(start, start + limitNum);

  res.json({ page: pageNum, limit: limitNum, total, totalPages, data });
});

app.listen(PORT, () => {
  console.log(
    `Day 3 Query Filtering server running on http://localhost:${PORT}`,
  );
});
