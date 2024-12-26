import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import BloodDonors from "../models/BloodDonors.js";

const router = express.Router();

router.get('/', async (req, res) => {
  const { bloodGroup, takingAntibiotic, age } = req.query
  const query = {}
  if (age && age != 'all') query.age = { $gte: age }
  if (bloodGroup && bloodGroup != 'all') query.bloodGroup = { $eq: bloodGroup }
  if (takingAntibiotic && takingAntibiotic != 'all') query.takingAntibiotic = {
    $eq: takingAntibiotic == 'yes' ? true : false
  }
  console.log(query)

  try {
    const donors = await BloodDonors.find(query)
    sendResponse(res, 200, donors, false, "Donors Fetched Successfully");
  }
  catch (err) {
    sendResponse(res, 500, null, true, "Something went wrong");
  }
}
)


export default router;
