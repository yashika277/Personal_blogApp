const express = require('express')
const router = express.Router()
const { User } = require('../models/user.model')
const bcrypt = require('bcrypt')
const { Post } = require('../models/post.model')
const { Comment } = require('../models/comment.model')
const verifyToken = require('../verifyToken')

//create
router.post("/create", verifyToken, async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

//update
router.put("/:id", verifyToken, async (req, res) => {
    try {

        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedComment)

    }
    catch (err) {
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)

        res.status(200).json("Comment has been deleted!")

    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get post comments
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
        res.status(200).json(comments)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router