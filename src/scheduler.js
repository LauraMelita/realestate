import 'dotenv/config';
import cron from 'node-cron';
import connectDB from '#config/db';
import AGENCIES from '#config/agencies';
import { runScraper } from '#jobs/runScraper';
import { logSuccess, logError } from '#utils/logger';

const startScheduler = async () => {
  try {
    await connectDB('scheduler');

    AGENCIES.forEach((agency) => {
      if (!agency.enabled) return;

      cron.schedule(agency.frequency, async () => {
        try {
          await runScraper(agency);
        } catch (error) {
          logError(`[scheduler] [${agency.name}] Failed to run scraper`, error.message);
        }
      });
    });

    logSuccess('[scheduler] Running cron jobs');
  } catch (error) {
    logError('[scheduler] Failed to start', error.message);
    process.exit(1);
  }
};

startScheduler();
