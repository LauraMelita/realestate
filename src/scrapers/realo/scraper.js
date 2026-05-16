import axios from 'axios';
import { endpoint } from '#scrapers/realo/endpoint';
import { formatData } from '#scrapers/realo/parser';
import { createUserAgent } from '#utils/helpers';

const filterResults = (data) => data.filter((item) => item.type !== 'AD'); // Remove injected ads from results

export const scrapeRealo = async () => {
  const { data } = await axios.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': createUserAgent(),
    },
  });

  const refinedData = filterResults(data?.data?.list?.assigns?.componentEstateListGrid?.data?.items || []);

  return formatData(refinedData);
};
