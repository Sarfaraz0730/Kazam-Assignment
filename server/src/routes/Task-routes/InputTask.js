const express = require("express");
const verify = require("../../helper/verify");
const { Task } = require("../../model/TaskModel/TaskModel");

const router = express.Router();

router.post("/", async (req, res, next) => {
    console.log("Data: ", req.body);

    const { title, status } = req.body;

    // Validation
    if (!title) {
        return res.status(400).send("Please enter the Task Title");
    } 
    if (!status) {
        return res.status(400).send("Please select the status");
    }

    // Convert status to lowercase to match enum
    req.body.status = status.toLowerCase();

    try {
        const taskAlreadyExist = await Task.findOne({ title });
        if (taskAlreadyExist) {
            return res.status(400).send("This task is already in the queue");
        } else {
            const saveTask = await Task.create(req.body);
            return res.status(201).json({ message: "Task created successfully", saveTask });
        }
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
