const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Day4User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Day4Post || mongoose.model("Day4Post", postSchema);
