const express = require("express");
const verify = require("../../helper/verify");
const { Task } = require("../../model/TaskModel/TaskModel");

const router = express.Router();

router.patch("/:taskId", verify, async (req, res) => {
    const { taskId } = req.params;
    const userId = req.decoded._id; 
    const { status } = req.body;

    console.log("🟡 Received PATCH request");
    console.log("Task ID from frontend:", taskId);
    console.log("New status from frontend:", status);
    console.log("User ID from token:", userId);

    try {
       
        const task = await Task.findOne({ _id: taskId, userId });
        console.log("Found Task in DB:", task);

        if (!task) {
            console.log("Task not found or unauthorized access");
            return res.status(404).json({ message: "Task not found or unauthorized access" });
        }

     
        task.status = status;
        task.updatedAt = new Date();

        await task.save();

        console.log("Task updated successfully:", task);

        return res.status(200).json({ message: "Task status updated successfully", task });
    } catch (error) {
        console.error(" Error updating task status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
