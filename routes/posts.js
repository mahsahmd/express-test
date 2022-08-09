import express from "express";
const router = express.Router();
import { getPost, setPost, updatePost, deletePost, getPosts } from "../controllers/postsControllers";


router.route('/').get(getPosts).post(setPost);
router.route('/:postId').get(getPost).delete(deletePost).put(updatePost);

export default router;