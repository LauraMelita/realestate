import SEARCH_CONFIG from '#config/search';

export const params = {
  status: '1',
  type: ['2'], // Apartment
  PurposeStatusIds: [1], // For sale
  ZipCodes: SEARCH_CONFIG.locations.map(({ postalCode }) => String(postalCode)),
  max: String(SEARCH_CONFIG.maxPrice),
  rooms: String(SEARCH_CONFIG.minRooms),
};
