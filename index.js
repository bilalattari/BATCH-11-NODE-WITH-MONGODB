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
import { Resend } from 'resend';
import nodemailer from 'nodemailer'
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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




app.get("/sendEmail", (req, res) => {
  const { email, subject, content } = req.query
  // const resend = new Resend('re_3hh7qh24_GR2R19LmS8dg84k8gWhXzKJT');

  // resend.emails.send({
  //   from: 'onboarding@resend.dev',
  //   to: email,
  //   subject: subject,
  //   html: content
  // }).then(() => {
  //   console.log('Email sent')
  // }).catch((err) => console.log(err));

  // const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: '👋 Hello from Node.js 🚀',
  //   text: subject
  // };
  // // Send the email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error('❌ Error:', error.message);
  //   } else {
  //     console.log('✅ Email sent:', info.response);
  //   }
  // });
  // res.send('Email sent')

});



app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
