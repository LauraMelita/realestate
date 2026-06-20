import axios from 'axios';
import SEARCH_CONFIG from '#config/search';
import MYIMMO_CONFIG from '#scrapers/myimmo/constants';
import { params } from '#scrapers/myimmo/params';
import { formatData } from '#scrapers/myimmo/parser';
import { createUserAgent } from '#utils/helpers';

const fetchPage = async (page) => {
  const payload = { ...params, pages: page };

  const { data } = await axios.post(MYIMMO_CONFIG.apiUrl, payload, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': createUserAgent(),
    },
  });

  return data;
};

const filterResults = (data) =>
  data.filter((item) => {
    const matchesSurfaceFilter = item.area >= SEARCH_CONFIG.minSurface;

    const matchesFeatureFilter =
      !SEARCH_CONFIG.features.length || SEARCH_CONFIG.features.some((feature) => !!item[feature]);

    return matchesSurfaceFilter && matchesFeatureFilter;
  });

export const scrapeMyimmo = async () => {
  const firstPage = await fetchPage(1);
  const totalPages = firstPage.totalPages || 1;

  const rawData = [...(firstPage.data?.estates || [])];

  for (let page = 2; page <= totalPages; page++) {
    const data = await fetchPage(page);

    rawData.push(...(data.data?.estates || []));
  }

  const refinedData = filterResults(rawData);

  return formatData(refinedData);
};
