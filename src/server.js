import 'dotenv/config';
import connectDB from '#config/db';
import app from '#app';
import { logSuccess, logError } from '#utils/logger';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB('server');

    app.listen(PORT, () => logSuccess(`[server] Running at http://localhost:${PORT}/properties`));
  } catch (error) {
    logError('[server] Failed to start', error.message);
    process.exit(1);
  }
};

startServer();
