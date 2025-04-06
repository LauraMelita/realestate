import SEARCH_PARAMS from '#config/search';

export const payload = {
  filters: {
    categories: [SEARCH_PARAMS.category.code],
    min_price: '',
    max_price: SEARCH_PARAMS.maxPrice,
    more_options: SEARCH_PARAMS.features.map(({ type }) => type),
    zipcodes: SEARCH_PARAMS.locations.map(({ postalCode }) => postalCode),
    types: [],
    regions: [],
    min_rooms: SEARCH_PARAMS.minRooms,
    max_rooms: '',
  },
  pagination: {
    page: 1,
    limit: 1000,
  },
  sort: 'updated_at',
  locale: 'en',
};
