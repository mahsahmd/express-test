import express from "express";
const app = express();
const port = 3000;
import path from 'path';
import bodyParser from "body-parser";
import cors from "cors";

// app.get('/',(req,res) => {
//     res.send('Hello World!')
// })
const __dirname = path.resolve()
app.use(express.static(__dirname),cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
let books = [];
app.post('/book', (req, res) => {
    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});
app.get('/books',(req,res) => {
    res.json(books);
})
app.listen(port, () => {
    console.log(`example app listening on port ${port}`);
})