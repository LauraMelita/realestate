import { sendNotification } from '#services/telegram';
import { saveNewProperties } from '#controllers/property';
import { humanDateTime } from '#utils/helpers';
import { logInfo, logSuccess, logWarning } from '#utils/logger';

export const runScraper = async ({ name, label, method: scraper, hasLinkPreview }) => {
  logWarning(`[scheduler] [${name}] Running scraper at ${humanDateTime()}`);

  const data = await scraper();
  const newProperties = await saveNewProperties(data, name);

  if (!newProperties.length) {
    logInfo(`[scheduler] [${name}] No new properties found`);
  } else {
    logSuccess(`[scheduler] [${name}] ${newProperties.length} new properties saved`);
  }

  if (newProperties.length) await sendNotification(newProperties, { hasLinkPreview, agencyLabel: label });

  return newProperties;
};
