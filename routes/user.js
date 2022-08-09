import express from "express";
const router = express.Router();
import { registerUser, getMe, LoginUser } from "../controllers/userControllers";

router.post('/', registerUser);
router.post('/login', LoginUser);
router.get('/me', getMe);



export default router;