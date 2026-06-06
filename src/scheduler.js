import 'dotenv/config';
import cron from 'node-cron';
import AGENCIES from '#config/agencies';
import connectDB from '#config/db';
import processAgency from '#jobs/agency';
import { logSuccess, logError } from '#utils/logger';

const CONTEXT = 'scheduler';

try {
  await connectDB(CONTEXT);

  AGENCIES.forEach((agency) => {
    if (!agency.enabled) return;

    cron.schedule(agency.frequency, async () => {
      try {
        await processAgency(CONTEXT, agency);
      } catch (error) {
        logError(`[${CONTEXT}] [${agency.name}] Failed to run scraper`, error.message);
      }
    });
  });

  logSuccess(`[${CONTEXT}] Running cron jobs`);
} catch (error) {
  logError(`[${CONTEXT}] Failed to start`, error.message);
  process.exit(1);
}
