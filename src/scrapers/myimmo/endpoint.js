import SEARCH_CONFIG from '#config/search';
import MYIMMO_CONFIG from '#scrapers/myimmo/constants';
import { buildPHPSearchUrl } from '#utils/helpers';

const propertyType = MYIMMO_CONFIG.propertyType[SEARCH_CONFIG.category];
const listingType = MYIMMO_CONFIG.listingType[SEARCH_CONFIG.purpose];
const cities = SEARCH_CONFIG.locations.map(({ city }) => city);
const minMaxPrice = `0|${SEARCH_CONFIG.maxPrice}`;

const params = {
  reference: '',
  typeFilter: propertyType,
  cityFilter: cities,
  priceFilter: minMaxPrice,
};

export const endpoint = buildPHPSearchUrl(`${MYIMMO_CONFIG.baseUrl}/fr/${listingType}.php`, params);
