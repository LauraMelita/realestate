import mongoose from 'mongoose';

import { logError } from '#services/logger';

const connectDB = async () => {
  const DB = process.env.DATABASE;

  try {
    await mongoose.connect(DB);
    console.log('DB connection successful!');
  } catch (error) {
    logError('DB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
