const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Lets Express read JSON sent in the request body
app.use(express.json());

// In-memory data
let users = [
  { id: 1, name: 'Amina Otieno', email: 'amina@example.com' },
  { id: 2, name: 'Brian Kamau', email: 'brian@example.com' },
];
let nextId = 3;

const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validation middleware: runs before the route handler
const validateUser = (req, res, next) => {
  // "|| {}" stops a crash when the request has no body at all
  const { name, email } = req.body || {};
  const errors = [];

  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (!isValidEmail(email)) {
    errors.push('A valid email is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET one user
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'User id must be a whole number' });
  }

  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST create a user
app.post('/api/users', validateUser, (req, res) => {
  const { name, email } = req.body;

  const emailTaken = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (emailTaken) {
    return res.status(400).json({ errors: ['Email is already registered'] });
  }

  const newUser = { id: nextId++, name: name.trim(), email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 404 handler (keep at the end)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Day 2 users API running at http://localhost:${PORT}`);
});
