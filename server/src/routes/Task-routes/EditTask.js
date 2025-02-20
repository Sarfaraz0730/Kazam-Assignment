const express = require("express");
const { Task } = require("../../model/TaskModel/TaskModel");

const router = express.Router();

// PATCH route to edit a task
router.patch("/:taskId", async (req, res, next) => {
    const { taskId } = req.params; // Get task ID from URL params
    const updateData = req.body; // Get updated task data from request body

    console.log("Task ID:", taskId);
    console.log("Update Data:", updateData);
    

    try {
        // Find task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { 
            new: true,       // Return the updated task
            runValidators: true // Validate the updated data against the schema
        });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            message: "Task updated successfully",
            updatedTask,
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
