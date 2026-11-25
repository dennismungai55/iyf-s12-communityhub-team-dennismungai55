// day-5-authorization/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Day5User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Day5Post || mongoose.model("Day5Post", postSchema);
