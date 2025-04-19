import axios from 'axios';

import SEARCH_CONFIG from '#config/search';
import LATOUR_ET_PETIT_CONFIG from '#scrapers/latouretpetit/constants';
import { payload } from '#scrapers/latouretpetit/payload';
import { formatData } from '#scrapers/latouretpetit/parser';

const filterResults = (data) =>
  data.filter((item) => {
    return SEARCH_CONFIG.features.some(({ type }) => {
      if (type === 'garden') return item.garden === 1;
      if (type === 'terrace') return item.terrace === 1;

      return false;
    });
  });

export const scrapeLatourEtPetit = async () => {
  const { data } = await axios.post(LATOUR_ET_PETIT_CONFIG.apiUrl, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const refinedData = filterResults(data?.estates || []);

  return formatData(refinedData);
};
