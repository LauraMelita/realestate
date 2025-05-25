import SEARCH_CONFIG from '#config/search';
import IMMOWEB_CONFIG from '#scrapers/immoweb/constants';

const propertyType = SEARCH_CONFIG.category;
const listingType = IMMOWEB_CONFIG.listingTypes[SEARCH_CONFIG.purpose];
const postalCodes = `BE-${SEARCH_CONFIG.locations.map(({ postalCode }) => postalCode).join(',')}`; // e.g. 'BE-1030,1040,1060,1070,1081,1090,1160,1210'
const gardenFeature = SEARCH_CONFIG.features.find(({ type }) => type === 'garden');
const terraceFeature = SEARCH_CONFIG.features.find(({ type }) => type === 'terrace');

export const searchUrl = `${IMMOWEB_CONFIG.apiUrl}/${propertyType}/${listingType}`;

export const searchParams = {
  countries: 'BE',
  isUnderOption: false,
  isALifeAnnuitySale: false,
  isAnInvestmentProperty: false,
  isNewlyBuilt: false,
  postalCodes,
  minPrice: 0,
  maxPrice: SEARCH_CONFIG.maxPrice,
  minSurface: SEARCH_CONFIG.minSurface,
  hasTerraceOrGarden: !!(gardenFeature || terraceFeature),
  minBedroomCount: 1,
  page: 1,
  orderBy: 'relevance',

  // NOTE:
  // Immoweb applies both filters as AND: properties must have garden *and* terrace.
  // Limits results too much — disabling them for now.
  // ============================================================
  // ...(gardenFeature && { minGardenSurface: gardenFeature.minSurface }),
  // ...(terraceFeature && { minTerraceSurface: terraceFeature.minSurface }),
};
