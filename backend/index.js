import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());
const PORT = 8800;
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

app.get("/", (req, res) => {
  res.json("Hello from the server side!");
});

app.get("/flashcards", (req, res) => {
  const q = "SELECT * FROM content";
  db.query(q, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.get("/flashcards/:id", (req, res) => {
  const q = "SELECT * FROM content WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.post("/flashcards", (req, res) => {
  const q =
    "INSERT INTO content (`title`, `question`, `answer`, `picture`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.question,
    req.body.answer,
    req.body.picture,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Data inserted successfully!");
    }
  });
});

app.delete("/flashcards/:id", (req, res) => {
  const q = "DELETE FROM content WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Data deleted successfully!");
    }
  });
});

app.put("/flashcards/:id", (req, res) => {
  const q =
    "UPDATE content SET `title` = ?, `question` = ?, `answer` = ?, `picture` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.question,
    req.body.answer,
    req.body.picture,
    req.params.id,
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Data updated successfully!");
    }
  });
});
app.listen(process.env.PORT || PORT, () => {
  console.log("Backend server is running!");
});
