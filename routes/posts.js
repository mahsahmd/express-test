import express from "express";
const router = express.Router();
import { getPost, setPost, updatePost, deletePost, getPosts } from "../controllers/postsControllers";

import { protect } from "../middleware/authMiddleware"
router.route('/').get(protect, getPosts).post(protect, setPost);
router.route('/:postId').get(protect, getPost).delete(protect, deletePost).put(protect, updatePost);

export default router;