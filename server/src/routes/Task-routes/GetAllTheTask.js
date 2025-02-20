const express = require("express");

const router = express.Router();
const { Task } = require("../../model/TaskModel/TaskModel");
const verify = require("../../helper/verify");


router.get("/", verify, async (req, res, next)=>{
   
    try{
        const getAllData = await Task.find()
        return res.status(200).send(getAllData)
       }catch(err){
        return res.status(500).send("internal server error")
       }
});

module.exports = router