import mongoose, { Document, Schema } from 'mongoose';

const projectSchema =  new mongoose.Schema({
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
  
interface Project {
  name: string;
  description?: string;
  admin: mongoose.Types.ObjectId | { type: mongoose.Types.ObjectId; ref: 'User' };
  members?: mongoose.Types.ObjectId[] | { type: mongoose.Types.ObjectId; ref: 'User' }[];
  tasks?: mongoose.Types.ObjectId[] | { type: mongoose.Types.ObjectId; ref: 'Task' }[];
}
interface TaskDocument extends Project, Document {}
  
const TaskModel = mongoose.model<TaskDocument>('Task', projectSchema);
  
export default TaskModel;
  