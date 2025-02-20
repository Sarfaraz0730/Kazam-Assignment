const express = require("express");
const mongoose = require("mongoose");
const { Task } = require("../../model/TaskModel/TaskModel");
const verify = require("../../helper/verify");

const router = express.Router();

// Route to get all tasks for a particular user
router.get("/:userId", verify, async (req, res) => {
    const { userId } = req.params;

    // Validate userId as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        // Find tasks that belong to this user
        const userTasks = await Task.find({ userId });

        // Check if tasks exist for the user
        if (!userTasks || userTasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        // Send the tasks as a response
        return res.status(200).json(userTasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
