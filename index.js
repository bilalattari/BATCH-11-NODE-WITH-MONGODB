import express from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import taskRoutes from "./routers/tasks.js";
import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/users.js";
import donorRoutes from "./routers/blooddonors.js";
import { authenticateUser } from "./middleware/authentication.js";
import cors from 'cors'
const app = express();
const PORT = 4000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors('*'))

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("err=>", err));

app.get("/", (req, res) => res.send("Server is running"));

app.use("/task", authenticateUser, taskRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/blooddonors", authenticateUser, donorRoutes);

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
