import SEARCH_CONFIG from '#config/search';
import IMMOVLAN_CONFIG from '#scrapers/immovlan/constants';

const getTownsValue = (locations) =>
  locations
    .map(({ postalCode, city }) => `${postalCode}-${city.toLowerCase()}`)
    .join(',');

export const payload = {
  transactiontypes: IMMOVLAN_CONFIG.listingType[SEARCH_CONFIG.purpose],
  propertytypes: SEARCH_CONFIG.category,
  towns: getTownsValue(SEARCH_CONFIG.locations), // e.g. '1090-jette,1081-koekelberg'
  maxprice: SEARCH_CONFIG.maxPrice,
  minlivablesurface: SEARCH_CONFIG.minSurface,
  pageSize: 1000,
};
