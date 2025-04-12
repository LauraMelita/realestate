import axios from 'axios';

import { endpoint } from '#scrapers/realo/endpoint';
import { formatData } from '#scrapers/realo/parser';

// Remove injected ads from results
const filterResults = (data) => data.filter((item) => item.type !== 'AD');

export const scrapeRealo = async () => {
  const { data } = await axios.get(endpoint);

  const refinedData = filterResults(
    data?.data?.list?.assigns?.componentEstateListGrid?.data?.items,
  );

  return formatData(refinedData);
};
