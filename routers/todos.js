import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import {
  authenticateUser,
} from "../middleware/authentication.js";
import Todos from "../models/Todos.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let newTodo = new Todos({
    todo: req.body.todo,
    createdBy: req.user._id,
  });
  newTodo = await newTodo.save();
  sendResponse(res, 200, newTodo, false, "Todo added successfully");
});

export default router;
