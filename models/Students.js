import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    father_name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Courses", // Reference to a "Course" collection
    },
    education: {
      type: String,
      enum: ["High School", "Diploma", "Bachelor's", "Master's", "PhD"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Students = mongoose.model("students", studentSchema);

export default Students;
