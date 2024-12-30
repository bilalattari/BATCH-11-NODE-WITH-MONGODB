import express from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routers/tasks.js";
import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/users.js";
import donorRoutes from "./routers/blooddonors.js";
import todoRoutes from "./routers/todos.js";
import courseRoutes from "./routers/course.js";
import orderRoutes from "./routers/orders.js";
import { authenticateUser } from "./middleware/authentication.js";
const app = express();
const PORT = 4000;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors("*"));

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("err=>", err));

app.get("/", (req, res) => res.send("Server is running"));

app.use("/task", authenticateUser, taskRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/blooddonors", authenticateUser, donorRoutes);
app.use("/todos", todoRoutes);
app.use("/course", courseRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
