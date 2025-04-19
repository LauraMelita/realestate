import IMMOWEB_CONFIG from '#scrapers/immoweb/constants';
import { endpoints } from '#scrapers/immoweb/endpoints';
import { formatData } from '#scrapers/immoweb/parser';
import { usePuppeteer } from '#utils/scraper';
import { filterEmpty, deduplicateByKey } from '#utils/helpers';

const extractPageData = async (page) => {
  await page.waitForSelector(IMMOWEB_CONFIG.selectors.searchResults);

  const rawData = await page.$$eval(
    IMMOWEB_CONFIG.selectors.searchResults,
    (items, selectors) =>
      items.map((item) => {
        const url = item.querySelector(selectors.link)?.href;
        const price = item.querySelector(selectors.price)?.innerText;
        const details = item.querySelector(selectors.details)?.innerText;
        const locality = item.querySelector(selectors.locality)?.innerText;
        const image = item.querySelector(selectors.image)?.src;
        return { url, price, details, locality, image };
      }),
    IMMOWEB_CONFIG.selectors,
  );

  const refinedData = filterEmpty(rawData);

  return formatData(refinedData);
};

export const scrapeImmoweb = async () => {
  const allData = [];

  for (const { url } of endpoints) {
    const data = await usePuppeteer(url, IMMOWEB_CONFIG.selectors.nextPage, extractPageData);

    allData.push(...data);
  }

  return deduplicateByKey(allData, 'hash');
};
