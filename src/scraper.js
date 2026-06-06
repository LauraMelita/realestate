import 'dotenv/config';
import connectDB from '#config/db';
import AGENCIES from '#config/agencies';
import processAgency from '#jobs/agency';
import { logError } from '#utils/logger';

const CONTEXT = 'scraper';
const AGENCY_NAME = process.argv[2];

try {
  await connectDB(CONTEXT);

  const agency = AGENCIES.find((agency) => agency.name === AGENCY_NAME);

  if (!agency) throw new Error(`No scraper is configured for agency "${AGENCY_NAME}"`);

  await processAgency(CONTEXT, agency);
  process.exit(0);
} catch (error) {
  logError(`[${CONTEXT}] [${AGENCY_NAME}] Failed to run scraper`, error.message);
  process.exit(1);
}
