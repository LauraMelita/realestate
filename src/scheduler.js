import cron from 'node-cron';

import { logError } from '#services/logger';

import AGENCIES from '#config/agencies';
import { saveNewProperties } from '#controllers/property';
import { sendNotification } from '#services/telegram';

const scheduler = () => {
  AGENCIES.forEach(({ name, method: scraper, frequency, hasLinkPreview }) => {
    cron.schedule(frequency, async () => {
      try {
        const data = await scraper();
        const newProperties = await saveNewProperties(data, name);

        if (newProperties.length)
          await sendNotification(newProperties, hasLinkPreview);
      } catch (error) {
        logError(`Error running scraper for ${name}:`, error.message);
      }
    });
  });
};

export default scheduler;
