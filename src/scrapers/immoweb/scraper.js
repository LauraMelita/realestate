import { filterEmpty, deduplicateByKey } from '#utils/helpers';
import { endpoints } from '#scrapers/immoweb/endpoints';
import { formatData } from '#scrapers/immoweb/parser';
import { usePuppeteer } from '#utils/scraper';

const PAGE_SELECTORS = {
  searchResults: 'ul.search-results__list li.search-results__item',
  link: 'a.card__title-link',
  price: 'p.card--result__price',
  locality: '.card__information.card--results__information--locality',
  surface: '.card__information--property',
  nextPage: 'li.pagination__item:last-child a.pagination__link--next',
};

const extractPageData = async (page) => {
  await page.waitForSelector(PAGE_SELECTORS.searchResults);

  const rawData = await page.$$eval(
    PAGE_SELECTORS.searchResults,
    (items, selectors) =>
      items.map((item) => {
        const url = item.querySelector(selectors.link)?.href;
        const price = item.querySelector(selectors.price)?.innerText;
        const locality = item.querySelector(selectors.locality)?.innerText;
        const surface = item.querySelector(selectors.surface)?.innerText;
        return { url, price, surface, locality };
      }),
    PAGE_SELECTORS,
  );

  const refinedData = filterEmpty(rawData);

  return formatData(refinedData);
};

export const scrapeImmoweb = async () => {
  const allData = [];

  for (const { type, searchURL } of endpoints) {
    console.log(`Scraping apartments with ${type} from ${searchURL}`);

    const data = await usePuppeteer(
      searchURL,
      PAGE_SELECTORS.nextPage,
      extractPageData,
    );

    allData.push(...data);
  }

  return deduplicateByKey(allData, 'hash');
};
