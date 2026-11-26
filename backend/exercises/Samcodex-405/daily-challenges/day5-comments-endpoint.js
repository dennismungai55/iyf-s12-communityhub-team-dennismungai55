const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Lets Express read JSON sent in the request body
app.use(express.json());

// In-memory data
const posts = [
  { id: 1, title: 'Getting Started with Node.js', author: 'amina' },
  { id: 2, title: 'Express Routing in Ten Minutes', author: 'brian' },
];

const comments = [
  { id: 1, postId: 1, author: 'brian', text: 'Great intro!', createdAt: '2026-11-03T10:00:00Z' },
  { id: 2, postId: 1, author: 'cyrus', text: 'Very helpful, thanks.', createdAt: '2026-11-03T12:30:00Z' },
];
let nextCommentId = 3;

// Turns "3" into 3, or returns null if it is not a whole number
const toId = (value) => {
  const n = Number(value);
  return Number.isInteger(n) ? n : null;
};

// GET all comments on a post
app.get('/api/posts/:id/comments', (req, res) => {
  const postId = toId(req.params.id);
  if (postId === null) {
    return res.status(400).json({ error: 'Post id must be a whole number' });
  }
  if (!posts.find((p) => p.id === postId)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(comments.filter((c) => c.postId === postId));
});

// POST a new comment on a post
app.post('/api/posts/:id/comments', (req, res) => {
  const postId = toId(req.params.id);
  if (postId === null) {
    return res.status(400).json({ error: 'Post id must be a whole number' });
  }
  if (!posts.find((p) => p.id === postId)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // "|| {}" stops a crash when the request has no body at all
  const { author, text } = req.body || {};
  if (!author || !text) {
    return res.status(400).json({ error: 'author and text are required' });
  }

  const newComment = {
    id: nextCommentId++,
    postId,
    author,
    text,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// DELETE a comment
app.delete('/api/posts/:id/comments/:commentId', (req, res) => {
  const postId = toId(req.params.id);
  const commentId = toId(req.params.commentId);
  if (postId === null || commentId === null) {
    return res.status(400).json({ error: 'Ids must be whole numbers' });
  }
  if (!posts.find((p) => p.id === postId)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const index = comments.findIndex(
    (c) => c.id === commentId && c.postId === postId
  );
  if (index === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  comments.splice(index, 1);
  res.status(204).send(); // 204 = success, nothing to send back
});

// 404 handler (keep at the end)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Day 5 comments API running at http://localhost:${PORT}`);
});
