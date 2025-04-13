import SEARCH_PARAMS from '#config/search';
import { API_URL } from '#scrapers/realo/constants';
import { buildSearchUrl } from '#utils/helpers';

// NOTE: 'amenities[]' doesn't seem to filter results on Realo. Omitting it for now.
const params = {
  'ways[]': 'SALE',
  'types[]': SEARCH_PARAMS.category.toUpperCase(),
  isListSearch: true,
  boundaryAddressIds: SEARCH_PARAMS.locations.map(({ realoId }) => realoId),
  priceMax: SEARCH_PARAMS.maxPrice,
  habitablesizeMin: SEARCH_PARAMS.minSurface,
  // 'amenities[]': 'HAS_GARDEN',
  // 'amenities[]': 'HAS_TERRACE',
};

export const endpoint = buildSearchUrl(API_URL, params);
