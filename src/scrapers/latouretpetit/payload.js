import SEARCH_CONFIG from '#config/search';
import LATOUR_ET_PETIT_CONFIG from '#scrapers/latouretpetit/constants';

export const payload = {
  filters: {
    categories: [LATOUR_ET_PETIT_CONFIG.propertyType[SEARCH_CONFIG.category]],
    max_price: String(SEARCH_CONFIG.maxPrice),
    zipcodes: SEARCH_CONFIG.locations.map(({ postalCode }) => String(postalCode)),
    min_rooms: String(SEARCH_CONFIG.minRooms),
  },
  pagination: {
    page: 1,
    limit: 1000,
  },
  sort: 'updated_at',
  locale: 'en',
};
