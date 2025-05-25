import { searchUrl, searchParams } from '#scrapers/immoweb/query';
import { formatData } from '#scrapers/immoweb/parser';
import { fetchAllPages } from '#utils/api';

const filterResults = (data) =>
  data.filter((item) => {
    const newRealestateProject = item.flags?.secondary?.includes('new_real_estate_project');

    return !newRealestateProject;
  });

export const scrapeImmoweb = async () => {
  const allRawResults = await fetchAllPages({
    url: searchUrl,
    method: 'GET',
    contentType: 'json',
    baseParams: searchParams,
    paginationField: 'page',
    extractResults: (data) => data?.results,
  });

  const refinedData = filterResults(allRawResults || []);

  return formatData(refinedData);
};
