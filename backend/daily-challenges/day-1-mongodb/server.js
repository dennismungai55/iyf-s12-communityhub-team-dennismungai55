require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = process.env.DAY1_PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

const pingSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
  },
  { timestamps: true },
);
const Ping = mongoose.model("DailyChallengePing", pingSchema);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("[Day 1] Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("[Day 1] MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/test", async (req, res, next) => {
  try {
    const items = await Ping.find().sort({ createdAt: -1 }).limit(20);
    res.json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
});

app.post("/test", async (req, res, next) => {
  try {
    const doc = await Ping.create({
      message: req.body.message || "Hello MongoDB Atlas",
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`[Day 1] Server running on http://localhost:${PORT}`);
});
