import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

// router.get("/", (req, res) => {
//   res.status(200).json({
//     error: false,
//     data: users,
//     msg: "User's fetched Successfully",
//   });
// });

router.post("/", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!email)
    return res.status(400).json({ error: true, msg: "Email is Required" });
  if (!password)
    return res.status(400).json({ error: true, msg: "Password is Required" });

  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(400)
      .json({ error: true, msg: "User already registered with this email" });

  const hashedPassword = await bcrypt.hash(password, 12);
  console.log("hashedPassword=>", hashedPassword);

  let newUser = new User({ fullname, email, password: hashedPassword });
  newUser = await newUser.save();

  res.status(201).json({
    error: false,
    data: newUser,
    msg: "User added Successfully",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email)
    return res.status(400).json({ error: true, msg: "Email is Required" });
  if (!password)
    return res.status(400).json({ error: true, msg: "Password is Required" });

  const user = await User.findOne({ email: email }).lean();
  if (!user)
    return res
      .status(400)
      .json({ error: true, msg: "User is not registered with this email." });

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched)
    return res.status(400).json({ error: true, msg: "Add Valid Crendetials" });

  delete user.password;

  var token = jwt.sign(user, "dshkagdfskjagfskdjhfgdskjh");

  res.status(201).json({
    error: false,
    data: { user, token },
    msg: "User login Successfully",
  });
});

router.get("/getUser", async (req, res) => {
  console.log("req.headers.authorization=>", req.headers.authorization);
  const authorization = req.headers?.authorization;
  const token = authorization?.split(" ")[1];
  if (!token)
    return res.status(403).json({ error: true, msg: "Token not provided" });
  const decoded = jwt.verify(token, "dshkagdfskjagfskdjhfgdskjh");
  if (!decoded)
    return res.status(403).json({ error: true, msg: "Not Valid tokem" });
  const user = await User.findById(decoded._id);
  console.log("decoded=>", decoded);

  res
    .status(200)
    .json({ error: false, user, msg: "User fetched Successfully" });
});

// router.get("/:id", (req, res) => {
//   const user = users.find((data) => data.id == req.params.id);
//   if (!user) {
//     return res.status(404).json({
//       error: true,
//       data: null,
//       msg: "User not found",
//     });
//   }
//   res.status(200).json({
//     error: false,
//     data: user,
//     msg: "User found successfully",
//   });
// });

export default router;
