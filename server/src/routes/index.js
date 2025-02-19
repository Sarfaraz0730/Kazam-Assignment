const express = require('express')
const Registration = require("./User-routes/Registration")
const home = require("./Home-route/home.js")
const Login = require("./User-routes/Login")
const { send } = require('process')
const router = express.Router()
router.use("/", home)
console.log("test")
router.use("/Registration", Registration)
router.use("/login", Login)
// router.get("/", (res,req)=>{res.statusCode(200).send("server is working")})

module.exports = router