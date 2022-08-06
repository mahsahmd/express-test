import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from "./routes/posts";
import bodyParser from "body-parser";
import cors from "cors"
const app = express();
const port = process.env.port || 5000;
dotenv.config()

// middlewares
app.use(cors())
app.use(bodyParser.json())
//import routes
const postRoutes = router;
app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    res.send('we are on home')
})
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to db');
})