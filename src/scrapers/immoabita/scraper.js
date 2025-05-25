import SEARCH_CONFIG from '#config/search';
import IMMOABITA_CONFIG from '#scrapers/immoabita/constants';
import { payload } from '#scrapers/immoabita/payload';
import { formatData } from '#scrapers/immoabita/parser';
import { fetchAllPages } from '#utils/api';

const filterResults = (data) =>
  data.filter((item) => {
    const matchesFeatures = SEARCH_CONFIG.features.some(({ type }) => {
      if (type === 'garden') return item.garden === 1;
      if (type === 'terrace') return item.terrace === 1;
      return false;
    });

    // Filter surface manually (API param for surface unknown)
    const matchesSurface = item.minArea >= SEARCH_CONFIG.minSurface;

    return matchesFeatures && matchesSurface;
  });

export const scrapeImmoabita = async () => {
  const allRawResults = await fetchAllPages({
    url: IMMOABITA_CONFIG.apiUrl,
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    baseParams: payload,
    paginationField: 'pagenumber',
    extractResults: (data) => data,
  });

  const refinedData = filterResults(allRawResults || []);

  return formatData(refinedData);
};
