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
import postRoutes from "./routers/post.js";
import studentRoutes from "./routers/students.js";

import { authenticateUser } from "./middleware/authentication.js";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

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
app.use("/post", postRoutes);
app.use("/students", studentRoutes);

app.get("/sendEmail", async (req, res) => {
  const info = await transporter.sendMail({
    from: '"Bilal Aur Code 👻" <bilalaurcode@gmail.com', // sender address
    to: "attari1235@gmail.com, bilalteaching@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.send("Message sent: %s" + info.messageId);
});

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
