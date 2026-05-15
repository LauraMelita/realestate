import SEARCH_CONFIG from '#config/search';

export const payload = {
  isajax: 1,
  estateaction: 'getestates',
  category: 2, // apartment
  purpose: 1, // sale
  rooms: SEARCH_CONFIG.minRooms,
  minprice: 0,
  maxprice: SEARCH_CONFIG.maxPrice,
  zips: SEARCH_CONFIG.locations.map(({ postalCode }) => postalCode),
  orderByField: 'putOnlineDateTime',
  orderSorting: 1,
  pagenumber: 1, // Pagination field
};
