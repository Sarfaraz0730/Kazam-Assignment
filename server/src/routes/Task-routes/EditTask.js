const express = require("express");
const mongoose = require("mongoose");
const { Task } = require("../../model/TaskModel/TaskModel");

const router = express.Router();

// PATCH route to edit a task
router.patch("/:taskId", async (req, res) => {
    const { taskId } = req.params;
    const updateData = req.body;

    // Validate taskId as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID format" });
    }

    // Ensure there's data to update
    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No data provided for update" });
    }

    try {
        // Find task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
            new: true,        // Return the updated task
            runValidators: true, // Validate the updated data against the schema
        });

        // Check if task exists
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
