const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to CommunityHub');
});

// About page
app.get('/about', (req, res) => {
  res.send('CommunityHub - A community platform');
});

// Current time as JSON
app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

// 404 handler (keep at the end)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Day 1 server running at http://localhost:${PORT}`);
});
