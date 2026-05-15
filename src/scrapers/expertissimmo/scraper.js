import axios from 'axios';
import SEARCH_CONFIG from '#config/search';
import { endpoint } from '#scrapers/expertissimmo/endpoint';
import { formatData } from '#scrapers/expertissimmo/parser';

const filterResults = (data) =>
  data.filter((item) => {
    const hasGarden = SEARCH_CONFIG.features.includes('garden') && item.garden === 1;
    const hasTerrace = SEARCH_CONFIG.features.includes('terrace') && item.terrace === 1;

    return hasGarden || hasTerrace;
  });

export const scrapeExpertissimmo = async () => {
  const { data } = await axios.get(endpoint);

  const refinedData = filterResults(data?.estates || []);

  return formatData(refinedData);
};
