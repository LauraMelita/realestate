import 'dotenv/config';

import connectDB from '#config/db';
import scheduler from '#scheduler';
import app from '#app';
import { logError } from '#services/logger';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    scheduler();
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}...`);
    });
  } catch (error) {
    logError('Failed to start the server', error);
    process.exit(1);
  }
};

startServer();
