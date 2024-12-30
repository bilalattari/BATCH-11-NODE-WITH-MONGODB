import express from "express";
const router = express.Router();
import Orders from "../models/Orders.js";
import sendResponse from "../helpers/sendResponse.js";


router.get("/", async (req, res) => {
  const { type, year, search } = req.query
  const matchObj = {}
  if (type && type !== 'all') matchObj.size = type
  if (year && year !== 'all') matchObj.date = {
    $gte: new Date(+year, 0, 1,),
    $lte: new Date(+year, 11, 31,)
  }
  if (search) {
    matchObj.name = {
      $regex: `^${search}`,  // Matches names that start with the search string
      $options: 'i'          // Case-insensitive search
    };
  }
  let orders = await Orders.aggregate([
    {
      $match: matchObj
    },
    {
      $addFields: {
        totalOrderValua: { $multiply: ["$quantity", "$price"] }
      }
    },
    {
      $sort: {
        quantity: -1
      }
    }
  ])
  let stats = await Orders.aggregate([
    {
      $match: matchObj
    },
    {
      $group: {
        _id: null, totalQuantity: { $sum: "$quantity" },
        totalPrice: { $sum: "$price" },
        totalOrderValue: { $sum: { $multiply: ["$price", "$quantity"] } }
      }
    },
  ])
  let groupStats = await Orders.aggregate([
    {
      $match: matchObj
    },
    {
      $group: {
        _id: "$name", totalQuantity: { $sum: "$quantity" },
        totalPrice: { $sum: "$price" },
        totalOrderValue: { $sum: { $multiply: ["$price", "$quantity"] } }
      }
    },
    {
      $sort: { totalOrderValue: -1 }
    }
  ])
  sendResponse(res, 200, {
    orders, stats: stats[0],
    groupStats: groupStats
  }, false, "Orders Fetched Successfully");
});


export default router;
