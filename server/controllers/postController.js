import mongoose from "mongoose";
import Post from "../model/postModel.js";

// @router      POST    /api/posts/
// @access      private
const createPost = async(req, res, next) => {
    try {
        const {title, content} = req.body;

        const post = await Post.create({
            title: title,
            content: content,
            author: req.user._id,
        })

        // 201 created
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
}

// @router      GET    /api/posts/
// @access      public
const getAllPosts = async(req, res, next) => {
    try {
        const posts = await Post.find()
            .populate("author", "username") // helps to find username from objectID
            .sort({ createdAt: -1 }) // -1 sort data from newest -> oldest or use 1 or oldest -> newewst
        
        res.json(posts);
    } catch (error) {
        next(error);
    }
}

// @router      GET    /api/posts/:id
// @access      public
const getPostById = async(req, res, next) => {
    try {
        const { id } = req.params;

        // check valid MongoDB objectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid Post ID");
        }

        const post = await Post.findById(id)
            .populate("author", "username");
        
        if(!post) {
            res.status(404);
            throw new Error("Post not found");
        }

        res.json(post);
    } catch (error) {
        next(error);
    }
} 

// @router      PUT    /api/posts/:id
// @access      private
const updatePost = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // check valid mongoDB ID
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400); // 400 = Bad Request
            throw new Error("Invalid Post ID");
        }

        const post = await Post.findById(id);
        if(!post) {
            res.status(404);
            throw new Error("Post not found");
        }

        // only author can edit post
        if( post.author.toString() !== req.user._id.toString()) {
            res.status(403); // 403 = Forbidden
            throw new Error("Not authorized");
        }

        // ?? -> checks if there is title then it will be updated otherwise there will be old title
        // ?? -> Also insures that if the title is empty string ("") title will remain the old one
        post.title = title ?? post.title; 
        post.content = content ?? post.content;
        
        const updatedPost = await post.save();
        
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
}

// @router      POST    /api/posts/:id
// @access      private
const deletePost = async(req, res, next) => {
    try {
        const { id } = req.params;

        // check valid mongoose ID
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid Post Id");
        }

        const post = await Post.findById(id);
        if(!post) {
            res.status(404);
            throw new Error("Post not found");
        }

        // only author can delete
        if(post.author.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error("Not Authorized");
        }

        await post.deleteOne();
        res.status(200).json({message: "Post deleted"});
    } catch (error) {
        next(error);
    }
}

export {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}