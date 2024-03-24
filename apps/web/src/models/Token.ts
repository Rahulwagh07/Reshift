import mongoose, { Document } from 'mongoose';

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 10,  
    },
});

interface Token {
    email: string;
    token: string;
    projectId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const Token = mongoose.models.Token as mongoose.Model<Token> || mongoose.model<Token>('Token', tokenSchema);

export default Token;
