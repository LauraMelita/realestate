import axios from 'axios';
import qs from 'qs';

const buildParams = (method, contentType, params) => {
  if (method === 'GET') return { params: params };

  if (method === 'POST') {
    switch (contentType) {
      case 'json':
        return { data: JSON.stringify(params) };

      case 'x-www-form-urlencoded':
        return { data: qs.stringify(params, { arrayFormat: 'brackets' }) };

      default:
        throw new Error(`Unsupported content type for POST: ${contentType}`);
    }
  }
};

export const fetchAllPages = async ({ url, method, baseParams, contentType, paginationField }) => {
  const allResults = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const paramsWithPagination = {
      ...baseParams,
      [paginationField]: page,
    };

    const { data: rawData } = await axios({
      method,
      url,
      ...buildParams(method, contentType, paramsWithPagination),
      headers: {
        'Content-Type': `application/${contentType}`,
      },
    });

    const results = rawData || [];

    console.log(`Fetched ${results.length} items on page ${page}`);

    allResults.push(...results);

    if (results.length === 0) {
      hasMore = false;
    } else {
      page++;
    }
  }

  console.log(`Fetched ${allResults.length} results in total`);

  return allResults;
};
