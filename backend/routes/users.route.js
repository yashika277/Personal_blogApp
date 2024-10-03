const express = require("express")
const { User } = require("../models/user.model")
const bcrypt = require("bcrypt");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");
const verifyToken = require('../verifyToken')


const router = express.Router();

//update
router.put("/:id",verifyToken, async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err);

    }
})

//delete
router.delete("/:id",verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({ userId: req.params.id });
        await Comment.deleteMany({ userId: req.params.id })
        res.status(200).json("User has been Deleted!")

    } catch (err) {
        res.status(500).json(err);

    }
})

//get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)

    } catch (err) {
        res.status(500).json(err);

    }
})

module.exports = router;