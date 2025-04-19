import cron from 'node-cron';

import { logScraperStart, logSaved, logError } from '#services/logger';

import AGENCIES from '#config/agencies';
import { saveNewProperties } from '#controllers/property';
import { sendNotification } from '#services/telegram';

const scheduler = () => {
  AGENCIES.forEach(({ name, method: scraper, frequency, hasLinkPreview }) => {
    cron.schedule(frequency, async () => {
      try {
        logScraperStart(name);
        const data = await scraper();
        const newProperties = await saveNewProperties(data, name);
        logSaved(name, newProperties.length);

        if (newProperties.length) await sendNotification(newProperties, hasLinkPreview);
      } catch (error) {
        logError(`Error running scraper for ${name}:`, error.message);
      }
    });
  });
};

export default scheduler;
