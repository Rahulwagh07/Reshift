import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToMongoDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('MongoDB Connection Successful');
  } catch (error) {
    console.error('MongoDB connection failed');
    console.error(error);
    process.exit(1);
  }
};