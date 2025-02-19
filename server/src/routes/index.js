const express = require('express')
const Registration = require("./User-routes/Registration")

const Login = require("./User-routes/Login")
const router = express.Router()
console.log("test")
router.use("/Registration", Registration)
router.use("/login", Login)

module.exports = router