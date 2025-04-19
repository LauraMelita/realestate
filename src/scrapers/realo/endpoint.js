import SEARCH_CONFIG from '#config/search';
import REALO_CONFIG from '#scrapers/realo/constants';
import { buildSearchUrl } from '#utils/helpers';

const { category, purpose, locations, maxPrice, minSurface } = SEARCH_CONFIG;

// NOTE: 'amenities[]' doesn't seem to filter results on Realo. Omitting it for now.
const params = {
  'ways[]': purpose.toUpperCase(),
  'types[]': category.toUpperCase(),
  isListSearch: true,
  boundaryAddressIds: locations.map(({ postalCode }) => REALO_CONFIG.zipIds[postalCode]),
  priceMax: maxPrice,
  habitablesizeMin: minSurface,
  // 'amenities[]': 'HAS_GARDEN',
  // 'amenities[]': 'HAS_TERRACE',
};

export const endpoint = buildSearchUrl(REALO_CONFIG.apiUrl, params);
