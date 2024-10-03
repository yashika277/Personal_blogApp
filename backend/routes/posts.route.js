const express = require("express")
const { User } = require("../models/user.model")
const bcrypt = require("bcrypt");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");
const verifyToken = require('../verifyToken')



const router = express.Router();

//create
router.post("/create", verifyToken, async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err);

    }
})

//update
router.put("/:id", verifyToken, async (req, res) => {
    try {

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err);

    }
})

//delete
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json("Post has been Deleted!")

    } catch (err) {
        res.status(500).json(err);

    }
})

//get post details
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (err) {
        res.status(500).json(err);

    }
})

//get posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)

    } catch (err) {
        res.status(500).json(err);

    }
})

//get user posts
router.get("/:userId", async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId })
        res.status(200).json(posts)

    } catch (err) {
        res.status(500).json(err);

    }
})

module.exports = router;