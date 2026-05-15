import SEARCH_CONFIG from '#config/search';
import EXPERTISSIMMO_CONFIG from '#scrapers/expertissimmo/constants';

const filters = {
  Filter: {
    LanguageId: 'fr-BE',
    ShowDetails: true,
    CategoryIds: [2], // apartment
    PurposeIds: [1], // sale
    PurposeStatusIds: EXPERTISSIMMO_CONFIG.status,
    ZipCodes: SEARCH_CONFIG.locations.map(({ postalCode }) => postalCode),
    PriceRange: {
      Min: 0,
      Max: SEARCH_CONFIG.maxPrice,
    },
    MinRooms: SEARCH_CONFIG.minRooms,
    MinSurface: SEARCH_CONFIG.minSurface,
  },
  Page: {
    Offset: 0,
    Limit: 1000,
  },
  Sort: [
    { Field: 'purposeStatusId', Ascending: true },
    { Field: 'updateDateTime', Ascending: false },
  ],
};

const encodedFilters = encodeURIComponent(JSON.stringify(filters));

export const endpoint = `${EXPERTISSIMMO_CONFIG.apiUrl}/EstateServiceGetEstateListRequest=${encodedFilters}`;
