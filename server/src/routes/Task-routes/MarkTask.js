const express = require("express");
const verify = require("../../helper/verify");
const { Task } = require("../../model/TaskModel/TaskModel");

const router = express.Router();


router.patch("/:taskId", verify, async (req, res) => {
    const { taskId } = req.params;
    console.log("task")
   
    const userId = req.decoded._id; 
    const { status } = req.body; 

  
    if (!status || !["pending", "in-progress", "completed"].includes(status.toLowerCase())) {
        return res.status(400).json({ message: "Invalid status value. Allowed values: pending, in-progress, completed" });
    }

    try {
     
        const task = await Task.findOne({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found or you don't have permission to modify this task" });
        }

        
        task.status = status.toLowerCase();
        task.updatedAt = new Date();

        await task.save();

        return res.status(200).json({ message: "Task status updated successfully", task });
    } catch (error) {
        console.error("Error updating task status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
