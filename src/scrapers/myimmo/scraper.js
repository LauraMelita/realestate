import SEARCH_CONFIG from '#config/search';
import MYIMMO_CONFIG from '#scrapers/myimmo/constants';
import { endpoint } from '#scrapers/myimmo/endpoint';
import { formatData } from '#scrapers/myimmo/parser';
import { usePuppeteer } from '#utils/scraper';

const getSurfaceValue = (surface) => Number(surface?.replace(',', '.').match(/[\d.]+/)?.[0] || 0);

const extractPageData = async (page) => {
  await page.waitForSelector(MYIMMO_CONFIG.selectors.card);

  const rawData = await page.$$eval(
    MYIMMO_CONFIG.selectors.card,
    (items, selectors) =>
      items.map((item) => {
        const link = item.querySelector(selectors.link)?.href;
        const price = item.querySelector(selectors.price)?.innerText;
        const peb = item.querySelector(selectors.peb)?.src;
        const status = item.querySelector(selectors.status)?.innerText;
        const surface = item.querySelector(selectors.surface)?.innerText;
        const bedrooms = item.querySelector(selectors.bedrooms)?.innerText;
        const address = item.querySelector(selectors.address)?.innerText;
        const image = item.querySelector(selectors.image)?.src;

        return { link, price, peb, status, surface, bedrooms, address, image };
      }),
    MYIMMO_CONFIG.selectors
  );

  return rawData
    .filter((item) => item.address?.trim()) // Filter out listings with empty addresses
    .filter((item) => getSurfaceValue(item.surface) >= SEARCH_CONFIG.minSurface) // Filter out listings below minimum surface
    .filter((item) => !['vendu', 'option'].includes(item.status?.toLowerCase())); // Filter out unavailable listings
};

export const scrapeMyimmo = async () => {
  const data = await usePuppeteer(endpoint, MYIMMO_CONFIG.selectors.nextPage, extractPageData);

  return formatData(data || []);
};
