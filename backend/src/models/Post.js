const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

// Add index for searching
postSchema.index({ title: "text", content: "text" });

// Virtual populate for comments
postSchema.virtual("commentList", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

// Enable virtuals in JSON and object output
postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

// Instance method
postSchema.methods.like = function () {
  this.likes++;
  return this.save();
};

// Static method: find posts by user ObjectId or populated/queried user IDs
postSchema.statics.findByAuthor = function (authorId) {
  return this.find({ author: authorId });
};

module.exports = mongoose.model("Post", postSchema);
