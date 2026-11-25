const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const { validatePost } = require("../middleware/validate");
const { protect, optionalAuth, restrictTo } = require("../middleware/auth");

// Public routes
router.get("/", optionalAuth, postsController.getAllPosts);
router.get("/:id", optionalAuth, postsController.getPostById);

// Protected post routes
router.post("/", protect, validatePost, postsController.createPost);
router.put("/:id", protect, postsController.updatePost);
router.delete("/:id", protect, postsController.deletePost);
router.patch("/:id/like", protect, postsController.likePost);

// Admin route
router.delete(
  "/:id/force",
  protect,
  restrictTo("admin"),
  postsController.forceDelete,
);

// Comment routes
router.get("/:postId/comments", optionalAuth, commentsController.getComments);
router.post("/:postId/comments", protect, commentsController.createComment);
router.delete(
  "/:postId/comments/:commentId",
  protect,
  commentsController.deleteComment,
);

module.exports = router;
