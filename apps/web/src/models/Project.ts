import mongoose, { Document } from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  admin: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  members: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],

  tasks: [{
    type: mongoose.Types.ObjectId,
    ref: 'Task',
  }],
});

interface Project {
  name: string;
  description?: string;
  admin: mongoose.Types.ObjectId;
  members?: mongoose.Types.ObjectId[];
  tasks?: mongoose.Types.ObjectId[];
}

// interface ProjectDocument extends Document, Project {}

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
