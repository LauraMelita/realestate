import SEARCH_PARAMS from '#config/search';
import { buildSearchUrl } from '#utils/helpers';

const { category, locations, maxPrice, minSurface, minRooms, features } =
  SEARCH_PARAMS;

const BASE_URL = `https://www.immoweb.be/en/search/${category.name}/for-sale?countries=BE`;

const BASE_PARAMS = {
  postalCodes: locations.map(({ postalCode }) => postalCode),
  maxPrice,
  minSurface,
  isALifeAnnuitySale: false,
  isUnderOption: false,
  minBedroomCount: minRooms,
};

const FEATURE_PARAMS = {
  garden: {
    flag: { hasGarden: true },
    surfaceKey: 'minGardenSurface',
  },
  terrace: {
    flag: { hasGarden: false },
    surfaceKey: 'minTerraceSurface',
  },
};

// Immoweb returns fewer results when combining garden and terrace filters,
// so splitting them into separate endpoints prevents missing listings 💩

export const endpoints = features.map(({ type, minSurface }) => {
  const { flag, surfaceKey } = FEATURE_PARAMS[type];

  return {
    type,
    url: buildSearchUrl(BASE_URL, {
      ...BASE_PARAMS,
      ...flag,
      [surfaceKey]: minSurface,
    }),
  };
});
