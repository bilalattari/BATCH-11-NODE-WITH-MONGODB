import express from "express";
import userRoutes from "./routers/users.js";
import mongoose from "mongoose";

const app = express();
const PORT = 4000;

mongoose
  .connect("mongodb+srv://blog:blog@blog-app.ke01i.mongodb.net/test")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("err=>", err));
app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
