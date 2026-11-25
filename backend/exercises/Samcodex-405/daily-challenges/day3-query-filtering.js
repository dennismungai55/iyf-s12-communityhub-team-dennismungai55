const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data
const posts = [
  { id: 1, title: 'Getting Started with Node.js', author: 'amina', createdAt: '2026-11-02T09:00:00Z', likes: 12 },
  { id: 2, title: 'Express Routing in Ten Minutes', author: 'brian', createdAt: '2026-11-05T14:30:00Z', likes: 30 },
  { id: 3, title: 'Why Status Codes Matter', author: 'amina', createdAt: '2026-11-08T08:15:00Z', likes: 7 },
  { id: 4, title: 'Query Strings vs Route Params', author: 'cyrus', createdAt: '2026-11-10T17:45:00Z', likes: 19 },
  { id: 5, title: 'Node Middleware Explained', author: 'brian', createdAt: '2026-11-12T11:00:00Z', likes: 25 },
];

// GET /api/posts?author=amina&search=node&sort=popular&page=1&limit=2
app.get('/api/posts', (req, res) => {
  const { author, search, sort = 'newest' } = req.query;

  // Copy first so sorting does not reorder the original data
  let result = [...posts];

  // Filter by author (?author=amina)
  if (author) {
    result = result.filter((p) => p.author.toLowerCase() === author.toLowerCase());
  }

  // Search in title (?search=node)
  if (search) {
    const term = search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(term));
  }

  // Sorting (?sort=newest | oldest | popular)
  if (sort === 'newest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === 'oldest') {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === 'popular') {
    result.sort((a, b) => b.likes - a.likes);
  } else {
    return res.status(400).json({ error: 'sort must be newest, oldest or popular' });
  }

  // Pagination (?page=1&limit=10). Query values are text, so convert them.
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
    return res.status(400).json({ error: 'page and limit must be positive whole numbers' });
  }

  const start = (page - 1) * limit;
  res.json({
    posts: result.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: result.length,
      pages: Math.ceil(result.length / limit),
    },
  });
});

// 404 handler (keep at the end)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Day 3 query filtering running at http://localhost:${PORT}`);
});
