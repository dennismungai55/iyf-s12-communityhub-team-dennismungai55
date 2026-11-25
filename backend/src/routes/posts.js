const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const { validatePost } = require("../middleware/validate");

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", validatePost, postsController.createPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);
router.patch("/:id/like", postsController.likePost);

router.get("/:postId/comments", commentsController.getComments);
router.post("/:postId/comments", commentsController.createComment);
router.delete("/:postId/comments/:commentId", commentsController.deleteComment);

module.exports = router;
