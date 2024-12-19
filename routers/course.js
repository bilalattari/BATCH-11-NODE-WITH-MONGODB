import express from "express";
const router = express.Router();
import Course from "../models/Course.js";
import sendResponse from "../helpers/sendResponse.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";

router.get("/", authenticateUser, async (req, res) => {
  const courses = await Course.find();
  sendResponse(res, 200, courses, false, "Courses Fetched successfully");
});

router.post("/", authenticateAdmin, async (req, res) => {
  let course = new Course(req.body);
  course = await course.save();
  sendResponse(res, 201, course, false, "Courses added successfully");
});

export default router;
