import express from "express";
const router = express.Router();
const users = [
  {
    fullname: "Bilal",
    email: "attari1235@gmail.com",
    id: 1,
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    error: false,
    data: users,
    msg: "User's fetched Successfully",
  });
});

router.post("/", (req, res) => {
  const { fullname, email } = req.body;
  console.log("fullname=>", fullname);
  console.log("email=>", email);
  users.push({ fullname, email, id: users.length + 1 });
  res.status(201).json({
    error: false,
    data: users,
    msg: "User added Successfully",
  });
});

router.get("/:id", (req, res) => {
  const user = users.find((data) => data.id == req.params.id);
  if (!user) {
    return res.status(404).json({
      error: true,
      data: null,
      msg: "User not found",
    });
  }
  res.status(200).json({
    error: false,
    data: user,
    msg: "User found successfully",
  });
});

export default router;
