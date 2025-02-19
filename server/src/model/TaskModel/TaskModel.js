const mongoose = require('mongoose');
const Joi = require('joi');

// Task schema definition
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'in-progress', 'completed'], 
        default: 'pending' 
    },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

// Task model
const Task = mongoose.model('Task', taskSchema);

// Joi validation schema
const validateTask = (task) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(5).max(500).required(),
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
        dueDate: Joi.date().required(),
        userId: Joi.string().hex().length(24).required()
    });
    return schema.validate(task);
};

module.exports = { Task, validateTask };
