import express from "express";
import fs from "fs";
import sendResponse from "../helpers/sendResponse.js";
import { authenticateUser } from "../middleware/authentication.js";
import Post from "../models/Post.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dcnuvqomr",
  api_key: "132558241711254",
  api_secret: "j6fpXiWbVkNmg9agXbUZ10efY-o",
});

// Create a new post
router.post("/", authenticateUser, upload.single("image"), async (req, res) => {
  try {
    const { heading, type } = req.body;

    if (!heading || !type) {
      return sendResponse(res, 400, null, true, "Heading and type are required.");
    }

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: `post_${Date.now()}`,
      folder: "blood_donation_posts",
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    // Create and save the post
    const newPost = new Post({
      heading,
      type,
      images: [uploadResult.secure_url],
      createdBy: req.user._id,
    });

    await newPost.save();

    sendResponse(res, 200, newPost, false, "Post added successfully.");
  } catch (error) {
    console.error("Error creating post:", error);
    sendResponse(res, 500, null, true, "Internal server error.");
  }
});

// Fetch all posts
router.get("/", authenticateUser, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "fullname email");

    sendResponse(res, 200, posts, false, "Posts fetched successfully.");
  } catch (error) {
    console.error("Error fetching posts:", error);
    sendResponse(res, 500, null, true, "Internal server error.");
  }
});

export default router;
