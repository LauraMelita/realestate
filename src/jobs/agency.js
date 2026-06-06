import { sendNotification } from '#services/telegram';
import { saveNewProperties } from '#controllers/property';
import { humanDateTime } from '#utils/helpers';
import { logInfo, logSuccess, logWarning } from '#utils/logger';

const processAgency = async (context, { name, label, method: scrape, hasLinkPreview }) => {
  logWarning(`[${context}] [${name}] Running scraper at ${humanDateTime()}`);

  const data = await scrape();
  const newProperties = await saveNewProperties(data, name);

  if (!newProperties.length) {
    logInfo(`[${context}] [${name}] No new properties found`);
  } else {
    logSuccess(`[${context}] [${name}] ${newProperties.length} new properties saved`);
  }

  if (newProperties.length) await sendNotification(newProperties, { hasLinkPreview, agencyLabel: label });

  return newProperties;
};

export default processAgency;
