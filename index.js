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

import express from "express";
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.status(200).send(tasks);
});

app.post("/", (req, res) => {
  res.send("Post Request is Called");
});

app.put("/", (req, res) => {
  res.send("Put Request is Called");
});

app.delete("/", (req, res) => {
  res.send("Delete Request is Called");
});

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
