import * as cheerio from 'cheerio';
import axios from 'axios';

import { SELECTORS } from '#scrapers/era/constants';
import { endpoint } from '#scrapers/era/endpoint';
import { formatData } from '#scrapers/era/parser';
import { filterEmpty } from '#utils/helpers';

const extractAPIData = (data) => {
  const rawData = data.data.map((item) => {
    const $ = cheerio.load(item.attributes.teaser);

    const isSold = $('article').attr('class')?.includes('property-sold');

    if (isSold) return null;

    return {
      id: item.id,
      link: $(SELECTORS.link).attr('href'),
      price: $(SELECTORS.price).text(),
      address: $(SELECTORS.address).text(),
      surface: $(SELECTORS.surface).text(),
      bedrooms: $(SELECTORS.bedrooms).text(),
      image: $(SELECTORS.image).attr('src'),
    };
  });

  const refinedData = filterEmpty(rawData);

  return formatData(refinedData);
};

export const scrapeEra = async () => {
  const { data } = await axios.get(endpoint);

  return extractAPIData(data);
};
