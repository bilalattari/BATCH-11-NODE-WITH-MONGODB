import jwt from "jsonwebtoken";
import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";

export function authenticateUser(req, res, next) {
  const bearerTOken = req.headers?.authorization;
  console.log("bearerTOken=>", bearerTOken);
  if (!bearerTOken)
    return sendResponse(res, 400, null, true, "Token Not Provided");

  const token = bearerTOken.split(" ")[1];

  const decoded = jwt.verify(token, process.env.AUTH_SECRET);

  req.user = decoded;
  console.log("decoded=>", decoded);
  next();
}

export function authenticateAdmin(req, res, next) {
  const bearerTOken = req.headers?.authorization;
  if (!bearerTOken)
    return sendResponse(res, 400, null, true, "Token Not Provided");

  const token = bearerTOken.split(" ")[1];

  const decoded = jwt.verify(token, process.env.AUTH_SECRET);
  if (decoded.role == "admin") {
    req.user = decoded;
    next();
  } else {
    return sendResponse(res, 403, null, true, "Admin only allewd to access");
  }
}
