import SEARCH_CONFIG from '#config/search';
import IMMOABITA_CONFIG from '#scrapers/immoabita/constants';

export const payload = {
  isajax: 1,
  estateaction: 'getestates',
  category: IMMOABITA_CONFIG.propertyTypes[SEARCH_CONFIG.category],
  purpose: IMMOABITA_CONFIG.listingTypes[SEARCH_CONFIG.purpose],
  rooms: SEARCH_CONFIG.minRooms,
  minprice: 0,
  maxprice: SEARCH_CONFIG.maxPrice,
  zips: SEARCH_CONFIG.locations.map(({ postalCode }) => postalCode),
  orderByField: 'putOnlineDateTime',
  orderSorting: 1,
  pagenumber: 1, // Pagination field
};
