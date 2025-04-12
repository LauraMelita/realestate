import axios from 'axios';

import { endpoint } from '#scrapers/century/endpoint';
import { formatData } from '#scrapers/century/parser';
import { logScraperStart } from '#services/logger';
import { deduplicateByKeys } from '#utils/helpers';

const filterResults = (data) => {
  const filtered = data.filter(({ status, title }) => {
    const isSold = status === 'SOLD';
    const isUnderOption = title.fr?.includes('SOUS COMPROMIS');

    return !isSold && !isUnderOption;
  });

  return deduplicateByKeys(filtered, ['address.street', 'price.amount']);
};

export const scrapeCentury = async () => {
  const { data } = await axios.get(endpoint);

  logScraperStart('Century21', null, endpoint);

  const refinedData = filterResults(data?.data);

  return formatData(refinedData);
};
