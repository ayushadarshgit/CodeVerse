const express = require("express");


const app = express()

app.get("/",(req,res)=>{
    res.send("Sending file from port 4000")
})

app.listen(4000,()=>{
    console.log("Listening on port 4000")
})