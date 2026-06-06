import 'dotenv/config';
import connectDB from '#config/db';
import app from '#app';
import { logSuccess, logError } from '#utils/logger';

const CONTEXT = 'server';
const PORT = process.env.PORT || 5000;

try {
  await connectDB(CONTEXT);
  app.listen(PORT, () => logSuccess(`[${CONTEXT}] Running at http://localhost:${PORT}/properties`));
} catch (error) {
  logError(`[${CONTEXT}] Failed to start`, error.message);
  process.exit(1);
}
