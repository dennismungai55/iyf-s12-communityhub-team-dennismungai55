const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_FILE = path.join(__dirname, 'requests.log');

// Logger middleware: logs method, URL, time, status and response time
const logger = (req, res, next) => {
  const start = Date.now();

  // 'finish' fires after the response has been sent
  res.on('finish', () => {
    const ms = Date.now() - start;
    const line = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`;

    console.log(line);

    // Bonus: also write the line to a log file
    fs.appendFile(LOG_FILE, line + '\n', (err) => {
      if (err) console.error('Could not write log file:', err.message);
    });
  });

  next(); // pass the request on to the next middleware or route
};

// Apply to every route
app.use(logger);

app.get('/', (req, res) => {
  res.send('Logger demo');
});

app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

// A deliberately slow route so you can see a bigger response time
app.get('/slow', (req, res) => {
  setTimeout(() => {
    res.json({ message: 'That took a while' });
  }, 300);
});

// 404 handler (keep at the end)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Day 4 logger demo running at http://localhost:${PORT}`);
});
