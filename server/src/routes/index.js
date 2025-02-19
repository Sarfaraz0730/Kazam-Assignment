const express = require('express')
const Registration = require("./User-routes/Registration")


const router = express.Router()
console.log("test")
router.use("/Registration", Registration)

module.exports = router