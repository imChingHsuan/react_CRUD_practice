const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3001);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "CRUDdatabase",
});

//read
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//create
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";

  db.query(sqlInsert, [movieName, movieReview]);
});

//delete
app.delete("/api/delete/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
  db.query(sqlDelete, movieId);
});

//update
app.put("/api/update/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const newReview = req.body.newReview;
  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";

  db.query(sqlUpdate, [newReview, movieId]);
});
