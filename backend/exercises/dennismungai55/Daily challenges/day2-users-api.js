const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

let users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
];
let nextId = 3;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body.email === "string" ? req.body.email.trim() : "";

  if (name.length < 2) {
    return res
      .status(400)
      .json({ error: "Name must be at least 2 characters" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Day 2 User API running on http://localhost:${PORT}`);
});
