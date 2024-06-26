import express from "express";
import upload from "../controllers/multer.js";
const router = express.Router();
import auth from "./auth.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controllers/postController.js";

// createPost
router.post("/:id", auth, upload.single("file"), createPost);

// getAllPosts
// http://localhost:5000/api/v1/posts
router.get("/", getAllPosts);

// getPostById
router.get("/:id", getPostById);

// updatePostById
router.put("/:id", auth, updatePostById);

// deletePostById
router.delete("/:id", auth, deletePostById);

export default router;
