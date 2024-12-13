import express from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import taskRoutes from "./routers/tasks.js";
import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/users.js";
const app = express();
const PORT = 4000;

app.use(morgan("tiny"));
app.use(express.json());

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("err=>", err));

app.get("/", (req, res) => res.send("Server is running"));

app.use("/task", taskRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
