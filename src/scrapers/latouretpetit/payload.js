import SEARCH_CONFIG from '#config/search';

export const payload = {
  filters: {
    categories: ['2'], // apartment
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
