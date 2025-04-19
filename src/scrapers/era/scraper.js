import * as cheerio from 'cheerio';
import axios from 'axios';

import ERA_CONFIG from '#scrapers/era/constants';
import { endpoint } from '#scrapers/era/endpoint';
import { formatData } from '#scrapers/era/parser';
import { filterEmpty } from '#utils/helpers';

const extractAPIData = (data) => {
  const raw = data.map((item) => {
    const $ = cheerio.load(item.attributes.teaser);

    const isSold = $('article').attr('class')?.includes('property-sold');
    if (isSold) return null;

    return {
      id: item.id,
      link: $(ERA_CONFIG.selectors.link).attr('href'),
      price: $(ERA_CONFIG.selectors.price).text(),
      address: $(ERA_CONFIG.selectors.address).text(),
      surface: $(ERA_CONFIG.selectors.surface).text(),
      bedrooms: $(ERA_CONFIG.selectors.bedrooms).text(),
      image: $(ERA_CONFIG.selectors.image).attr('src'),
    };
  });

  return filterEmpty(raw);
};

export const scrapeEra = async () => {
  const { data } = await axios.get(endpoint);

  const refinedData = extractAPIData(data?.data || []);

  return formatData(refinedData);
};
