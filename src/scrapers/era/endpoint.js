import SEARCH_CONFIG from '#config/search';
import ERA_CONFIG from '#scrapers/era/constants';
import { buildBracketedSearchUrl } from '#utils/helpers';

const { locations, maxPrice, minRooms, minSurface, features } = SEARCH_CONFIG;

const zipCodes = locations
  .map(({ postalCode }) => ERA_CONFIG.zipIds[postalCode])
  .filter(Boolean)
  .join('+');

const params = {
  sort: 'broker--field_start_date',
  'pager[offset]': 0,
  'filter[sale_or_rent]': 'sale',
  'filter[property_type]': '44', // apartment
  'filter[price]': `(min:;max:${maxPrice || ''})`, // e.g. (min:;max:350000)
  'filter[amount_bedrooms]': `(min:${minRooms || ''};max:)`, // e.g. (min:2;max:)
  'filter[habitable_area_m2]': `(min:${minSurface || ''};max:)`, // e.g. (min:95;max:)
  'filter[outside]': features.join(','), // e.g. terrace,garden
  'filter[location][sub_municipalities]': zipCodes, // e.g. 2880+2881
};

export const endpoint = buildBracketedSearchUrl(ERA_CONFIG.apiUrl, params);
