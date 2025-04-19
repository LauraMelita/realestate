import axios from 'axios';

import SEARCH_CONFIG from '#config/search';
import IMMOVLAN_CONFIG from '#scrapers/immovlan/constants';
import { createUserAgent } from '#utils/helpers';
import { payload } from '#scrapers/immovlan/payload';
import { formatData } from '#scrapers/immovlan/parser';

const filterResults = (data) => {
  return data.filter((item) => {
    const isSold = item.status === 'sold';
    const isUnderOption = item.status === 'option';
    const isProject = item.displayUrl.includes('/projectdetail');

    // Filtering features manually since the API only returns results matching all tags together
    const featureTags = SEARCH_CONFIG.features.map(({ type }) => IMMOVLAN_CONFIG.features[type]);

    const hasFeatures = featureTags.some((tag) => item.tags.includes(tag));

    return hasFeatures && !isSold && !isUnderOption && !isProject;
  });
};

export const scrapeImmovlan = async () => {
  const { data: rawData } = await axios.post(IMMOVLAN_CONFIG.apiUrl, payload, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': createUserAgent(),
    },
  });

  const refinedData = filterResults(rawData?.results?.properties || []);

  return formatData(refinedData);
};
