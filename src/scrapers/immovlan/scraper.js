import axios from 'axios';
import SEARCH_CONFIG from '#config/search';
import IMMOVLAN_CONFIG from '#scrapers/immovlan/constants';
import { payload } from '#scrapers/immovlan/payload';
import { formatData } from '#scrapers/immovlan/parser';
import { createUserAgent } from '#utils/helpers';

const filterResults = (data) =>
  data.filter((item) => {
    const isUnavailable = ['sold', 'option'].includes(item.status);
    const isProject = item.displayUrl.includes('/projectdetail');

    // Feature filtering is handled manually because the API applies all feature tags as AND conditions
    const matchesFeatureFilter = SEARCH_CONFIG.features.some((feature) =>
      item.tags?.includes(IMMOVLAN_CONFIG.featureTags[feature])
    );

    return matchesFeatureFilter && !isUnavailable && !isProject;
  });

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
