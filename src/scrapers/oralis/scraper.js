import * as cheerio from 'cheerio';
import axios from 'axios';

import ORALIS_CONFIG from '#scrapers/oralis/constants';
import { endpoint } from '#scrapers/oralis/endpoint';
import { formatData } from '#scrapers/oralis/parser';

const extractAPIData = (html) => {
  const $ = cheerio.load(html);

  return $(ORALIS_CONFIG.selectors.card)
    .map((_, el) => {
      const $el = $(el);

      const link = $el.attr('href');
      const isUnavailable = $el.find('.estate-flag__text').length > 0;

      if (!link || isUnavailable) return null;

      return {
        link,
        price: $el.find(ORALIS_CONFIG.selectors.price).text().trim(),
        city: $el.find(ORALIS_CONFIG.selectors.city).text().trim(),
        surface: $el.find(ORALIS_CONFIG.selectors.surface).parent().text().trim(),
        bedrooms: $el.find(ORALIS_CONFIG.selectors.bedrooms).parent().text().trim(),
        image: $el.find(ORALIS_CONFIG.selectors.image).attr('src'),
      };
    })
    .get();
};

export const scrapeOralis = async () => {
  const { data: html } = await axios.get(endpoint);

  const refinedData = extractAPIData(html);

  return formatData(refinedData || []);
};
