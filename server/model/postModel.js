import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, // every object has unique object id 
            ref: "User", // User is from userModel, meaning find in userModel
            required: true,
        }
    }, 
    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema);

export default Post;