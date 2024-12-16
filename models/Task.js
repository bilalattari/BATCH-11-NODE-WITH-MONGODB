import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    task: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Tasks", taskSchema);

export default Task;
