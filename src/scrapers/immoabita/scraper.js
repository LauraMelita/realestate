import SEARCH_CONFIG from '#config/search';
import IMMOABITA_CONFIG from '#scrapers/immoabita/constants';
import { payload } from '#scrapers/immoabita/payload';
import { formatData } from '#scrapers/immoabita/parser';
import { fetchAllPages } from '#utils/api';

const filterResults = (data) =>
  data.filter((item) => {
    const matchesGardenFilter = SEARCH_CONFIG.features.includes('garden') && item.garden === 1;
    const matchesTerraceFilter = SEARCH_CONFIG.features.includes('terrace') && item.terrace === 1;
    const matchesSurfaceFilter = item.minArea >= SEARCH_CONFIG.minSurface; // API param for surface unknown

    return (matchesGardenFilter || matchesTerraceFilter) && matchesSurfaceFilter;
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
