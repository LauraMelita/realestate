import SEARCH_PARAMS from '#config/search';
import { BASE_URL, FEATURE_PARAMS } from '#scrapers/immoweb/constants';
import { buildSearchUrl } from '#utils/helpers';

const { category, locations, maxPrice, minSurface, minRooms, features } =
  SEARCH_PARAMS;

const searchUrl = `${BASE_URL}/${category}/for-sale?countries=BE`;

const baseParams = {
  postalCodes: locations.map(({ postalCode }) => postalCode),
  maxPrice,
  minSurface,
  isALifeAnnuitySale: false,
  isUnderOption: false,
  minBedroomCount: minRooms,
};

// Immoweb returns fewer results when combining garden and terrace filters,
// so splitting them into separate endpoints prevents missing listings 💩

export const endpoints = features.map(({ type, minSurface }) => {
  const { flag, surfaceKey } = FEATURE_PARAMS[type];

  return {
    type,
    url: buildSearchUrl(searchUrl, {
      ...baseParams,
      ...flag,
      [surfaceKey]: minSurface,
    }),
  };
});
