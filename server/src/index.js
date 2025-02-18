const express = require('express');
const app = express()

const PORT =8080;

app.get("/", (req, res,next)=>{
    res.send("Hello")
})
app.listen(PORT, (req, res)=>{
    console.log(`server is listening on the PORT ${PORT}`)
})
