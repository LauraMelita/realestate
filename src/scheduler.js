import cron from 'node-cron';

import AGENCIES from '#config/agencies';
import { saveNewApartments } from '#controllers/apartment';
import { sendNotification } from '#services/telegram';

const scheduler = () => {
  AGENCIES.forEach(({ name, method: scraper, frequency }) => {
    cron.schedule(frequency, async () => {
      try {
        console.log(`Running scraper for ${name}`);
        const data = await scraper();
        const newApartments = await saveNewApartments(data);

        if (newApartments.length) await sendNotification(newApartments);
      } catch (error) {
        console.error(`Error running scraper for ${name}:`, error.message);
      }
    });
  });
};

export default scheduler;
