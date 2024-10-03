const express = require("express")
const router = express.Router();
const { User } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        const newUser = new User({ username, email, password: hashedPassword })
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    } catch (err) {
        res.status(500).json(err)
    }
})

//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        // If the user doesn't exist, return a 404 error
        if (!user) {
            return res.status(404).json("User Not Found");
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(404).json("Wrong Credentials!");
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "3d" });

        // Exclude the password from the response
        const { password, ...info } = user._doc;
        res.cookie("token", token).status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

//logout
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true })
            .status(200).send("User Logged out Successfully")
    } catch (err) {
        res.status(500).json(err);

    }
})

module.exports = router;