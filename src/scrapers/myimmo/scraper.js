import MYIMMO_CONFIG from '#scrapers/myimmo/constants';
import { endpoint } from '#scrapers/myimmo/endpoint';
import { formatData } from '#scrapers/myimmo/parser';
import { usePuppeteer } from '#utils/scraper';

const extractPageData = async (page) => {
  await page.waitForSelector(MYIMMO_CONFIG.selectors.card);

  const rawData = await page.$$eval(
    MYIMMO_CONFIG.selectors.card,
    (items, selectors) =>
      items.map((item) => {
        const link = item.querySelector(selectors.link)?.href;
        const price = item.querySelector(selectors.price)?.innerText;
        const surface = item.querySelector(selectors.surface)?.innerText;
        const bedrooms = item.querySelector(selectors.bedrooms)?.innerText;
        const address = item.querySelector(selectors.address)?.innerText;
        const image = item.querySelector(selectors.image)?.src;

        return { link, price, surface, bedrooms, address, image };
      }),
    MYIMMO_CONFIG.selectors
  );

  return rawData;
};

export const scrapeMyimmo = async () => {
  const data = await usePuppeteer(endpoint, MYIMMO_CONFIG.selectors.nextPage, extractPageData);

  return formatData(data || []);
};
