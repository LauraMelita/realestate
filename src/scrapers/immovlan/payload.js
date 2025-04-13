import SEARCH_PARAMS from '#config/search';

const getTownsValue = (locations) =>
  locations
    .map(({ postalCode, city }) => `${postalCode}-${city.toLowerCase()}`)
    .join(',');

export const payload = {
  transactiontypes: 'for-sale,in-public-sale',
  propertytypes: SEARCH_PARAMS.category,
  towns: getTownsValue(SEARCH_PARAMS.locations), // e.g. '1090-jette,1081-koekelberg'
  maxprice: SEARCH_PARAMS.maxPrice,
  minlivablesurface: SEARCH_PARAMS.minSurface,
  pageSize: 1000,
};
