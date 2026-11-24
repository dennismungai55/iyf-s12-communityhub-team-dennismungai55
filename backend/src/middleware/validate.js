const validatePost = (req, res, next) => {
  const { title, content, author } = req.body;
  const errors = [];

  if (typeof title !== "string" || title.trim().length < 3) {
    errors.push("Title must be at least 3 characters");
  }

  if (typeof content !== "string" || content.trim().length < 10) {
    errors.push("Content must be at least 10 characters");
  }

  if (typeof author !== "string" || author.trim().length === 0) {
    errors.push("Author is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validatePost,
};
