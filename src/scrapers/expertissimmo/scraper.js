import axios from 'axios';

import SEARCH_CONFIG from '#config/search';
import { endpoint } from '#scrapers/expertissimmo/endpoint';
import { formatData } from '#scrapers/expertissimmo/parser';

const filterResults = (data) =>
  data.filter((item) => {
    return SEARCH_CONFIG.features.some(({ type }) => {
      if (type === 'garden') return item.garden === 1;
      if (type === 'terrace') return item.terrace === 1;

      return false;
    });
  });

export const scrapeExpertissimmo = async () => {
  const { data } = await axios.get(endpoint);

  const refinedData = filterResults(data?.estates || []);

  return formatData(refinedData);
};
