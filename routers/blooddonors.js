import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import BloodDonors from "../models/BloodDonors.js";

const router = express.Router();

router.get('/', async (req, res) => {
  const { bloodGroup, takingAntibiotic, age } = req.query
  const query = {}
  if (age && age != 'all') query.age = { $gte: +age }
  if (bloodGroup && bloodGroup != 'all') query.bloodGroup = { $eq: bloodGroup }
  if (takingAntibiotic && takingAntibiotic != 'all') query.takingAntibiotic = {
    $eq: takingAntibiotic == 'yes' ? true : false
  }
  const bloodGroupWiseDonors = await BloodDonors.aggregate([
    {
      $match: query
    },
    {
      $group: {
        "_id": "$bloodGroup",
        totalQuantity: { $sum: 1 }
      }
    },
    {
      $sort: { totalQuantity: 1 }
    }
  ])
  const donors = await BloodDonors.aggregate([
    {
      $match: query
    },
    {
      $addFields: {
        isEligible: {
          $cond: { if: { $lte: ["$age", 35] }, then: "yes", else: "no" }
        }
      }
    },
    {
      $sort: { age: 1 }
    }
  ])

  console.log("bloodGroupWiseDonors=>", bloodGroupWiseDonors)
  try {
    sendResponse(res, 200, { bloodGroupWiseDonors, donors }, false, "Donors Fetched Successfully");
  }
  catch (err) {
    sendResponse(res, 500, null, true, "Something went wrong");
  }
}
)


export default router;
