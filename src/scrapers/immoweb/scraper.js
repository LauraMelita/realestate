import { filterEmpty, deduplicateByKey } from '#utils/helpers';
import { PAGE_SELECTORS } from '#scrapers/immoweb/constants';
import { endpoints } from '#scrapers/immoweb/endpoints';
import { formatData } from '#scrapers/immoweb/parser';
import { usePuppeteer } from '#utils/scraper';

const extractPageData = async (page) => {
  await page.waitForSelector(PAGE_SELECTORS.searchResults);

  const rawData = await page.$$eval(
    PAGE_SELECTORS.searchResults,
    (items, selectors) =>
      items.map((item) => {
        const url = item.querySelector(selectors.link)?.href;
        const price = item.querySelector(selectors.price)?.innerText;
        const details = item.querySelector(selectors.details)?.innerText;
        const locality = item.querySelector(selectors.locality)?.innerText;
        const image = item.querySelector(selectors.image)?.src;
        return { url, price, details, locality, image };
      }),
    PAGE_SELECTORS,
  );

  const refinedData = filterEmpty(rawData);

  return formatData(refinedData);
};

export const scrapeImmoweb = async () => {
  const allData = [];

  for (const { url } of endpoints) {
    const data = await usePuppeteer(
      url,
      PAGE_SELECTORS.nextPage,
      extractPageData,
    );

    allData.push(...data);
  }

  return deduplicateByKey(allData, 'hash');
};
