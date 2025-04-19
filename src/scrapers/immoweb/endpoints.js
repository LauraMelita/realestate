import SEARCH_CONFIG from '#config/search';
import IMMOWEB_CONFIG from '#scrapers/immoweb/constants';
import { buildSearchUrl } from '#utils/helpers';

const { category, purpose, locations, maxPrice, minSurface, minRooms, features } = SEARCH_CONFIG;

const searchUrl = `${IMMOWEB_CONFIG.baseUrl}/${category}/${IMMOWEB_CONFIG.slug[purpose]}?countries=BE`;

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
  const { flag, surfaceKey } = IMMOWEB_CONFIG.features[type];

  return {
    type,
    url: buildSearchUrl(searchUrl, {
      ...baseParams,
      ...flag,
      [surfaceKey]: minSurface,
    }),
  };
});
