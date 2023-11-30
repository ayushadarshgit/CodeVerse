const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const p = require('./utils/passportSetup');
const databaseUrl = process.env.DATABASE_URL;
const cookieSession = require("express-session");

const compileRoutes = require("./routes/compileRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const passportRoutes = require("./routes/passportRoutes");
const chatRoutes = require("./routes/chatRoutes");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const ExpressError = require("./utils/ExpressError");

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    secret: process.env.SESSION_SECRET
}));

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", () => {
    console.log("Connection Error");
})
db.once("open", () => {
    console.log("Database connected");
})

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-control-Allow-Headers",
        "origin, x-Requested-with, Content-Type, Accept"
    );
    next();
})

app.get("/", (req, res) => {
    res.send("Sending file from port 5000")
})

app.use("/codeverse/user", userRoutes);
app.use('/codeverse/compile', compileRoutes);
app.use("/codeverse/message", messageRoutes);
app.use("/codeverse/google", passportRoutes);
app.use("/codeverse/chats", chatRoutes);
app.use("/codeverse/folders", folderRoutes);
app.use("/codeverse/files", fileRoutes);
app.use("/codeverse/verify", verificationRoutes);


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found',404))
})

app.use((err, req, res, next) => {
    if (!err.message) err.message = "Something went wrong"
    if (!err.statusCode) err.statusCode = 400
    return res.status(err.statusCode).json({ success: false, err: err.message });
})


app.listen(5000, () => {
    console.log("Listening on port 5000")
})