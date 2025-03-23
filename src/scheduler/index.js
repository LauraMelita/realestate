import cron from 'node-cron';
import { sendNotification } from '#services/telegram';

const scheduler = () => {
  cron.schedule('*/10 * * * * *', async () => {
    try {
      // Placeholder for logic (e.g., scraping, DB updates)
      await sendNotification();
    } catch (error) {
      console.error('Scheduler error:', error.message);
    }
  });
};

export default scheduler;
