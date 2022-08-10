import express from "express";
const router = express.Router();
import { registerUser, getMe, LoginUser } from "../controllers/userControllers";
import { protect } from "../middleware/authMiddleware";

router.post('/', registerUser);
router.post('/login', LoginUser);
router.get('/me', protect, getMe);



export default router;