import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import Students from "../models/Students.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { age, course, aboveThen } = req.query;
  const query = {};
  if (age) query.age = { $eq: parseInt(age) };
  if (course) query.course = { $eq: course };
  if (aboveThen) query.age = { $gt: parseInt(aboveThen) };
  // const students = await Students.find(query);

  const students = await Students.aggregate([
    {
      $match: query,
    },
    {
      $addFields: {
        totalResult: { $sum: "$results" },
      },
    },
    {
      $sort: {
        totalResult: -1,
      },
    },
    {
      $lookup: {
        from: "courses",
        foreignField: "_id",
        localField: "course",
        as: "courseDetail",
      },
    },
    {
      $unwind: {
        path: "$courseDetail",
      },
    },
  ]);

  const studentsAccordingToAge = await Students.aggregate([
    {
      $group: {
        _id: "$age",
        count: { $sum: 1 },
      },
    },
  ]);
  const studentsAccordingToCourse = await Students.aggregate([
    {
      $group: {
        _id: "$course",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "courses",
        foreignField: "_id",
        localField: "_id",
        as: "courseDetail",
      },
    },
    {
      $unwind: {
        path: "$courseDetail",
      },
    },
    {
      $project: {
        title: "$courseDetail.title",
        count: 1,
      },
    },
  ]);

  sendResponse(
    res,
    200,
    {
      total: students.length,
      studentsAccordingToCourse,
      studentsAccordingToAge,
      students,
    },
    false,
    "Students Fetched Successfully"
  );
});

export default router;

//add krni he field
//field ko remove krna he
//keys ko update krna he
//data ke behalf pe koi calculation krwani he
//data ko group krna he

// Aggregation
