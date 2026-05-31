import SEARCH_CONFIG from '#config/search';

export const payload = {
  transactiontypes: 'for-sale,in-public-sale',
  propertytypes: 'apartment',
  towns: SEARCH_CONFIG.locations.map(({ postalCode, city }) => `${postalCode}-${city.toLowerCase()}`).join(','), // e.g. '1090-jette,1081-koekelberg'
  maxprice: SEARCH_CONFIG.maxPrice,
  minbedrooms: SEARCH_CONFIG.minRooms,
  minlivablesurface: SEARCH_CONFIG.minSurface,
  tags: '',
  municipals: '',
  provinces: '',
  regions: '',
  noIndex: 1,
};
