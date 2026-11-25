const Post = require("../models/Post");

const getAllPosts = async (req, res, next) => {
  try {
    const { author, search, sort, page = 1, limit = 10 } = req.query;
    const query = {};

    if (author) {
      query.author = new RegExp(author, "i");
    }

    if (search) {
      query.$text = { $search: search };
    }

    let sortOption = { createdAt: -1 };
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "popular") {
      sortOption = { likes: -1 };
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      Post.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Post.countDocuments(query),
    ]);

    res.json({
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, author, tags } = req.body;

    const post = new Post({
      title: typeof title === "string" ? title.trim() : title,
      content: typeof content === "string" ? content.trim() : content,
      author: typeof author === "string" ? author.trim() : author,
      tags,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const updates = {};

    if (typeof title === "string" && title.trim()) {
      updates.title = title.trim();
    }
    if (typeof content === "string" && content.trim()) {
      updates.content = content.trim();
    }
    if (tags !== undefined) {
      updates.tags = tags;
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(204).send();
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.like();
    res.json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
