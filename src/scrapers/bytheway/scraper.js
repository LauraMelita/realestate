import * as cheerio from 'cheerio';
import axios from 'axios';

import BYTHEWAY_CONFIG from '#scrapers/bytheway/constants';
import { payload } from '#scrapers/bytheway/payload';
import { formatData } from '#scrapers/bytheway/parser';
import { filterEmpty } from '#utils/helpers';

const extractAPIData = (data) => {
  const $ = cheerio.load(data);
  const { items, title, link, price, location, image } = BYTHEWAY_CONFIG.selectors;

  const raw = $(items)
    .toArray()
    .map((el) => {
      const element = $(el);
      const status = element.find(title).text().trim().toLowerCase();

      if (status === 'vendu' || status === 'option') return null;

      return {
        link: element.find(link).attr('data-url') || element.find('a').attr('href'),
        price: element.find(price).text().trim(),
        location: element.find(location).text().trim(),
        image: element.find(image).attr('data-src') || element.find(image).attr('src'),
      };
    });

  return filterEmpty(raw);
};

export const scrapeBytheway = async () => {
  const { data } = await axios.post(BYTHEWAY_CONFIG.apiUrl, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const refinedData = extractAPIData(data?.content || []);

  return formatData(refinedData);
};
