import axios from 'axios';

import SEARCH_PARAMS from '#config/search';
import { createUserAgent } from '#utils/helpers';
import { API_URL, FEATURE_TAG_MAP } from '#scrapers/immovlan/constants';
import { payload } from '#scrapers/immovlan/payload';
import { formatData } from '#scrapers/immovlan/parser';

const filterResults = (data) => {
  return data.filter((item) => {
    const isSold = item.status === 'sold';
    const isUnderOption = item.status === 'option';
    const isProject = item.displayUrl.includes('/projectdetail');

    // Filtering features manually since the API only returns results matching all tags together
    const featureTags = SEARCH_PARAMS.features.map(
      ({ type }) => FEATURE_TAG_MAP[type],
    );

    const hasFeatures = featureTags.some((tag) => item.tags.includes(tag));

    return hasFeatures && !isSold && !isUnderOption && !isProject;
  });
};

export const scrapeImmovlan = async () => {
  const { data: rawData } = await axios.post(API_URL, payload, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': createUserAgent(),
    },
  });

  const refinedData = filterResults(rawData?.results?.properties);

  return formatData(refinedData);
};
