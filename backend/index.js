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
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    if (!err.message) err.message = "Something went wrong"
    if (!err.statusCode) err.statusCode = 400
    return res.status(err.statusCode).json({ success: false, err: err.message });
})

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log("Listening on port 5000")
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (userId) => {
        if(!io.sockets.adapter.rooms.has(userId)){
            socket.join(userId);
        }
    });

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach(user => {
            if (user._id === newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        })
    })

    socket.off("setup", (userData) => {
        socket.leave(userData._id);
    })
})