const express = require("express");
const bodyParser = require("body-parser");

const compileRoutes = require("./routes/compileRoutes");

const app = express()


app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Sending file from port 5000")
})

app.use('/codeverse/compile',compileRoutes);

app.listen(5000,()=>{
    console.log("Listening on port 5000")
})