import { filterEmpty, deduplicateByKey } from '#utils/helpers';
import { endpoints } from '#scrapers/immoweb/endpoints';
import { formatData } from '#scrapers/immoweb/parser';
import { usePuppeteer } from '#utils/scraper';

const PAGE_SELECTORS = {
  searchResults: 'ul.search-results__list li.search-results__item',
  nextPage: 'li.pagination__item:last-child a.pagination__link--next',
  link: 'a.card__title-link',
  details: '.card__information--property',
  price: 'p.card--result__price',
  locality: '.card__information.card--results__information--locality',
  image: '.card__media-picture',
};

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

  for (const { type, url } of endpoints) {
    console.log(`Scraping properties with ${type} from ${url}`);

    const data = await usePuppeteer(
      url,
      PAGE_SELECTORS.nextPage,
      extractPageData,
    );

    allData.push(...data);
  }

  return deduplicateByKey(allData, 'hash');
};
