import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },

    description: { 
        type: String 
    },

    dueDate: { 
        type: Date 
    },

    priority: { 
        type: String, enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },

    status: { 
        type: String, 
        enum: ['To-Do', 'In Progress', 'Completed'], 
        default: 'To-Do' 
    },

    assignedUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },

    comments: [{ 
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }, 
        text: String, 
        createdAt: { 
            type: Date, 
            default: Date.now 
        } 
    }],
  });

  module.exports = mongoose.model("Task", taskSchema)