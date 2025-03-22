import mongoose from 'mongoose';

const connectDB = async () => {
  const DB = process.env.DATABASE;

  try {
    await mongoose.connect(DB);
    console.log('DB connection successful!');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
