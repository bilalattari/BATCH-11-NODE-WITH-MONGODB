import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "admin", "teacher"],
    default: "student",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
