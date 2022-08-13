import express from "express";
import { emialController } from "../controllers/emailControllers";
const router = express.Router();


router.post('/', emialController)


export default router;