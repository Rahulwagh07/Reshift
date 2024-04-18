import mongoose, { Document} from 'mongoose';

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
  });

interface Task {
    title: string;
    description?: string;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    status?: 'To-Do' | 'In Progress' | 'Completed';
    assignedUser?: mongoose.Types.ObjectId | { type: mongoose.Types.ObjectId; ref: 'User' };
  }

//   interface TaskDocument extends Task, Document {}
  
  const Task = mongoose.models.Task  ||  mongoose.model("Task", taskSchema);

export default Task;
  