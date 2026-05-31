import mongoose from 'mongoose';
import { logSuccess, logError } from '#utils/logger';

const connectDB = async (context) => {
  if (!context) throw new Error('connectDB requires a context');

  try {
    await mongoose.connect(process.env.DATABASE);
    logSuccess(`[${context}] DB connected`);
  } catch (error) {
    logError(`[${context}] DB connection error`, error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
