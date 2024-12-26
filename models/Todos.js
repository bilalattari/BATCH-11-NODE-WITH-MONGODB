import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    todo: String,
    completed: { type: Boolean, default: false },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);

const Todos = mongoose.model("Todos", todoSchema);
export default Todos;
