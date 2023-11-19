const express = require("express");
const bodyParser = require("body-parser");

const compileRoutes = require("./routes/compileRoutes");
const ExpressError = require("./utils/ExpressError");

const app = express()


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

app.get("/",(req,res)=>{
    res.send("Sending file from port 5000")
})

app.use('/codeverse/compile',compileRoutes);

app.use((err,req,res,next)=>{
    const {statusCode = 500, message = "Something went wrong"} = err;
    if(!err.message) err.message = "Something went wrong"
    return res.json({success: false,err: err});
})


app.listen(5000,()=>{
    console.log("Listening on port 5000")
})