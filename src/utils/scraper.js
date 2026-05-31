import puppeteer from 'puppeteer';
import { createUserAgent } from '#utils/helpers';

// ============================================================
// PUPPETEER
// ============================================================

const paginate = async (page, currentUrl, scrapeFn, nextPageSelector, results = []) => {
  await page.goto(currentUrl, { waitUntil: 'networkidle2' });

  const data = await scrapeFn(page);
  results.push(...data);

  const nextPageUrl = await page.$eval(nextPageSelector, (a) => a?.href).catch(() => null);

  return nextPageUrl ? paginate(page, nextPageUrl, scrapeFn, nextPageSelector, results) : results;
};

export const usePuppeteer = async (url, nextPageSelector, scrapeFn) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Set User-Agent to avoid bot detection
    await page.setUserAgent(createUserAgent());

    // If pagination is needed, use paginate
    if (nextPageSelector) {
      return await paginate(page, url, scrapeFn, nextPageSelector);
    }

    // Otherwise, scrape a single page and return the result
    await page.goto(url, { waitUntil: 'networkidle2' });
    return await scrapeFn(page);
  } finally {
    await browser.close();
  }
};
