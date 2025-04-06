import cron from 'node-cron';

import AGENCIES from '#config/agencies';
import { saveNewProperties } from '#controllers/property';
import { sendNotification } from '#services/telegram';

const scheduler = () => {
  AGENCIES.forEach(({ name, method: scraper, frequency, hasLinkPreview }) => {
    cron.schedule(frequency, async () => {
      try {
        console.log(`Running scraper for ${name}`);
        const data = await scraper();
        const newProperties = await saveNewProperties(data);

        if (newProperties.length)
          await sendNotification(newProperties, hasLinkPreview);
      } catch (error) {
        console.error(`Error running scraper for ${name}:`, error.message);
      }
    });
  });
};

export default scheduler;
