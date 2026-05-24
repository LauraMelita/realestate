import axios from 'axios';
import { endpoints } from '#scrapers/weinvest/endpoints';
import { formatData } from '#scrapers/weinvest/parser';
import { deduplicateByKey } from '#utils/helpers';

export const scrapeWeinvest = async () => {
  // WeInvest does not support combined exterior filters ("garden OR terrace"), so we perform one request per filter and deduplicate results
  const responses = await Promise.all(endpoints.map((url) => axios.get(url)));

  const rawData = responses.flatMap((response) => response.data?.data || []);

  const uniqueData = deduplicateByKey(rawData, 'id');

  return formatData(uniqueData);
};
