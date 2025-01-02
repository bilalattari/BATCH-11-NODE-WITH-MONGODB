import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
    {
        heading: String,
        type: { type: String, enum: ['donor', 'receiver'] },
        images: [String],
        createdBy: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
