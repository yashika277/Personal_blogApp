require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnect = require("./Db/dbConnect");
const authRoute = require("./routes/auth.route")
const userRoute = require("./routes/users.route")
const postRoute = require("./routes/posts.route")
const commentRoute = require("./routes/comments.route")


const app = express();

//for body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//for cookie
app.use(cookieParser());

//middleware
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)
//database connect
dbConnect();
app.listen(process.env.PORT, () => {
    console.log(`server listening on port: ${process.env.PORT}`);

})