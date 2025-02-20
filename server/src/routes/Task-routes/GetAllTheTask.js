const express = require("express");
const { Task } = require("../../model/TaskModel/TaskModel");
const verify = require("../../helper/verify");

const router = express.Router();

// Route to get all tasks for a particular user
router.get("/:userId", verify, async (req, res, next) => {
    try {
        // Get userId from URL params
        const { userId } = req.params;
        console.log("User ID from params:", userId);

        // Find tasks that belong to this user
        const userTasks = await Task.find({ userId });

        if (!userTasks || userTasks.length === 0) {
            return res.status(404).send("No tasks found for this user");
        }

        return res.status(200).json(userTasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
