import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },

    description: { 
        type: String 
    },

    admin: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', required: true 
    },

    members: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'User' 
    }],

    tasks: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Task' 
    }],
  });

  module.exports = mongoose.model("Project", projectSchema)