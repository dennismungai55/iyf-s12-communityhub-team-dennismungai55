const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3004;
const logDir = path.join(__dirname, "../../logs");
const logFile = path.join(logDir, "exercises.log");

function requestLogger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const entry = `[${timestamp}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`;
    console.log(entry);

    fs.mkdirSync(logDir, { recursive: true });
    fs.appendFile(logFile, entry + "\n", (err) => {
      if (err) {
        console.error("Log write error:", err.message);
      }
    });
  });

  next();
}

app.use(requestLogger);

app.get("/api/ping", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Day 4 Logger server running on http://localhost:${PORT}`);
});
