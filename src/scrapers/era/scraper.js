import * as cheerio from 'cheerio';
import axios from 'axios';
import ERA_CONFIG from '#scrapers/era/constants';
import { endpoint } from '#scrapers/era/endpoint';
import { formatData } from '#scrapers/era/parser';
import { filterEmpty } from '#utils/helpers';

const extractAPIData = (data) => {
  const raw = data.map((item) => {
    const isAd = item.id?.includes('ad_');

    if (isAd) return null;

    const $ = cheerio.load(item.attributes.teaser);

    const isSold = $('article').attr('class')?.includes('property-sold');
    const isOption = $('.campaign-field--flag').text().trim().toLowerCase().includes('option');

    if (isOption || isSold) return null;

    return {
      id: item.id,
      link: $(ERA_CONFIG.selectors.link).attr('href'),
      price: $(ERA_CONFIG.selectors.price).text().trim(),
      address: $(ERA_CONFIG.selectors.address).text().trim(),
      surface: $(ERA_CONFIG.selectors.surface).text().trim(),
      bedrooms: $(ERA_CONFIG.selectors.bedrooms).text().trim(),
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
