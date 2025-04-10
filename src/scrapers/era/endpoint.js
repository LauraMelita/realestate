import SEARCH_PARAMS from '#config/search';
import { buildBracketedSearchUrl } from '#utils/helpers';

const { category, locations, maxPrice, minSurface, features } = SEARCH_PARAMS;

const BASE_URL = 'https://www.era.be/en/jsonapi/index/property_index';

const ERA_CATEGORY_MAP = {
  apartment: '44',
};

const propertyType = ERA_CATEGORY_MAP[category]; // e.g, 44
const priceRanges = `(min:;max:${maxPrice || ''})`; // e.g. (min:;max:350000)
const surfaceRanges = `(min:${minSurface || ''};max:)`; // e.g. (min:85;max:)
const outsideFilter = features.map(({ type }) => type).join(','); // e.g. terrace,garden
const zipCodes = locations.map(({ eraId }) => eraId).join('+'); // e.g. 2880+2881

const PARAMS = {
  'filter[sale_or_rent]': 'sale',
  'filter[property_type]': propertyType,
  'filter[price]': priceRanges,
  'filter[habitable_area_m2]': surfaceRanges,
  'filter[outside]': outsideFilter,
  'filter[location][sub_municipalities]': zipCodes,
};

export const endpoint = buildBracketedSearchUrl(BASE_URL, PARAMS);
