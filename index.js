import express from "express";
import morgan from "morgan";
const tasks = [
  {
    id: 1,
    task: "Sona nahn he",
  },
  {
    id: 2,
    task: "Jagna he",
  },
  {
    id: 3,
    task: "Concept samjna he",
  },
];
const app = express();
const PORT = 4000;

app.use(morgan("tiny"));
app.use(express.json());

function middleware(req, res, next) {
  req.requestBy = "Bilal Raza";
  next();
}

// app.use(middleware);

app.get("/", (req, res) => {
  console.log("req.requestBy=>", req.requestBy);
  res.status(200).send(tasks);
});

app.post("/", (req, res) => {
  console.log("req.body=>", req.body);
  res.send("Post Request is Called");
});

app.put("/", (req, res) => {
  res.send("Put Request is Called");
});

app.delete("/", (req, res) => {
  res.send("Delete Request is Called");
});

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
