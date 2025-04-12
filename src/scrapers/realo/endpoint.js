import SEARCH_PARAMS from '#config/search';
import { buildSearchUrl } from '#utils/helpers';

const BASE_URL = 'https://www.realo.be/fr/search/estates.json';

// NOTE: 'amenities[]' doesn't seem to filter results on Realo. Omitting it for now.
const PARAMS = {
  'ways[]': 'SALE',
  'types[]': SEARCH_PARAMS.category.toUpperCase(),
  isListSearch: true,
  boundaryAddressIds: SEARCH_PARAMS.locations.map(({ realoId }) => realoId),
  priceMax: SEARCH_PARAMS.maxPrice,
  habitablesizeMin: SEARCH_PARAMS.minSurface,
  // 'amenities[]': 'HAS_GARDEN',
  // 'amenities[]': 'HAS_TERRACE',
};

export const endpoint = buildSearchUrl(BASE_URL, PARAMS);
