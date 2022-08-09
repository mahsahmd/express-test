import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import postRouter from "./routes/posts";
import bodyParser from "body-parser";
import cors from "cors"
import { errorHandler } from "./middleware/errorMiddleware";
import { connectDB } from "./config/db";
import userRouter from "./routes/user";


const app = express();
const port = process.env.port || 5000;
dotenv.config()

// middlewares
app.use(cors())
app.use(bodyParser.json())

//import routes
// const postRoutes = postRouter;
app.use('/posts', postRouter);

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send('we are on home')
})
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
// custome errorhandler
app.use(errorHandler);

//Connect to db
connectDB();