import SEARCH_PARAMS from '#config/search';
import { buildSearchUrl } from '#utils/helpers';

const { location, maxPrice, minSurface, minGardenSurface, minTerraceSurface } =
  SEARCH_PARAMS;

const BASE_URL =
  'https://www.immoweb.be/en/search/apartment/for-sale?countries=BE';

const BASE_PARAMS = {
  postalCodes: location.map(({ postalCode }) => postalCode),
  maxPrice,
  minSurface,
  isALifeAnnuitySale: false,
  isUnderOption: false,
};

export const endpoints = [
  {
    type: 'garden',
    url: buildSearchUrl(BASE_URL, {
      ...BASE_PARAMS,
      hasGarden: true,
      minGardenSurface,
    }),
  },
  {
    type: 'terrace',
    url: buildSearchUrl(BASE_URL, {
      ...BASE_PARAMS,
      hasGarden: false,
      minTerraceSurface,
    }),
  },
];
