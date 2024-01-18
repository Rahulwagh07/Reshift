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

interface Task {
    title: string;
    description?: string;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    status?: 'To-Do' | 'In Progress' | 'Completed';
    assignedUser?: mongoose.Types.ObjectId | { type: mongoose.Types.ObjectId; ref: 'User' };
    comments?: Comment[];
  }

  interface Comment {
    user: {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'User';
    };
    text: string;
    createdAt: {
      type: Date;
      default: Date;
    };
  }
  
  interface TaskDocument extends Task, Document {}
  
  const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
  
  export default TaskModel;
  