// ============================================
// LESSON 19 - CLASS EXERCISE
// CommunityHub posts API, read-only: GET endpoints, params, query strings.
// Week 10 - Tasks 19.3 and 19.4 (GET half) - Daily challenge Day 3 (bonus step)
//
// Lives in:  backend/exercises/Samcodex-405/posts-api.js
// Run from backend/:   node --watch exercises/Samcodex-405/posts-api.js
// Test with:           posts-api.http (VS Code REST Client), Thunder Client, Postman or curl
// ============================================

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data. Restart the server and every change is gone.
const posts = [
  {
    id: 1,
    title: 'Getting Started with Node.js',
    content: 'Node.js runs JavaScript outside the browser.',
    author: 'amina',
    createdAt: '2026-11-02T09:00:00Z',
    likes: 12,
  },
  {
    id: 2,
    title: 'Express Routing in Ten Minutes',
    content: 'A route is a method, a path and a handler.',
    author: 'brian',
    createdAt: '2026-11-05T14:30:00Z',
    likes: 30,
  },
  {
    id: 3,
    title: 'Why Status Codes Matter',
    content: '200, 201, 400, 404: the client reads the number first.',
    author: 'amina',
    createdAt: '2026-11-08T08:15:00Z',
    likes: 7,
  },
  {
    id: 4,
    title: 'Query Strings vs Route Params',
    content: 'Params name the thing. Query strings filter the list.',
    author: 'cyrus',
    createdAt: '2026-11-10T17:45:00Z',
    likes: 19,
  },
];

// STEP 1 - Text and JSON responses
app.get('/', (req, res) => {
  res.send('Welcome to CommunityHub API');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// STEP 2 - List all posts
// STEP 4 - filtered, searched and sorted by the query string
// STEP 5 - and paginated
app.get('/api/posts', (req, res) => {
  const { author, search, sort = 'newest' } = req.query;

  // Copy first. sort() changes the array it is called on,
  // so sorting `posts` itself would reorder the "database".
  let result = [...posts];

  // ?author=amina
  if (author) {
    result = result.filter((p) => p.author.toLowerCase() === author.toLowerCase());
  }

  // ?search=express
  if (search) {
    const term = search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(term));
  }

  // ?sort=newest | oldest | popular
  if (sort === 'newest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === 'oldest') {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === 'popular') {
    result.sort((a, b) => b.likes - a.likes);
  } else {
    return res.status(400).json({ error: 'sort must be newest, oldest or popular' });
  }

  // ?page=2&limit=2 (query values are always text, so convert them)
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

// STEP 3 - One post by id
app.get('/api/posts/:id', (req, res) => {
  // Params are text too. Number('abc') is NaN, but parseInt('2abc') would quietly be 2.
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Post id must be a whole number' });
  }

  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

// STEP 6 - 404 for every unmatched route. Must stay last, after all routes.
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Posts API running at http://localhost:${PORT}`);
});
