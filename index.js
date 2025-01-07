import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
const API_URL = "https://openlibrary.org/dev/docs/api/covers"

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "tunjimoney",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let read_books = [
    { id: 1, title: "Harry Potter" },
    { id: 2, title: "Romeo And Juliet" },
];

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM read_books ORDER BY id ASC");
        read_books = result.rows;
        res.render("index.ejs", {
            listItems: read_books,
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});