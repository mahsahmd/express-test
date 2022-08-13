import express from "express";
import dotenv from 'dotenv';
import postRouter from "./routes/posts";
import bodyParser from "body-parser";
import cors from "cors"
import { errorHandler } from "./middleware/errorMiddleware";
import { connectDB } from "./config/db";
import userRouter from "./routes/user";
import { engine } from "express-handlebars";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import emailRouter from "./routes/email"
const app = express();
const port = process.env.port || 5000;
dotenv.config()

//view engine setup
app.engine('handlebars', engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/"
}));
app.set('view engine', 'handlebars');


//static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/public', express.static(path.join(__dirname, '/public')));


// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//import routes
// const postRoutes = postRouter;
app.use('/posts', postRouter);

app.use('/users', userRouter)
app.use('/send', emailRouter)


app.get('/', (req, res) => {
    res.render('contact')
})
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
// custome errorhandler
app.use(errorHandler);

//Connect to db
connectDB();