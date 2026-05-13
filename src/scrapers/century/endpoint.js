import SEARCH_CONFIG from '#config/search';
import CENTURY_CONFIG from '#scrapers/century/constants';
import { buildSearchUrl } from '#utils/helpers';

const { locations, maxPrice, minRooms, minSurface, features } = SEARCH_CONFIG;

const filterPayload = {
  bool: {
    filter: {
      bool: {
        must: [
          { bool: { should: [{ match: { 'address.countryCode': 'be' } }] } },
          { match: { listingType: 'FOR_SALE' } },
          { match: { type: 'APARTMENT' } },
          { bool: { should: locations.map(({ postalCode }) => ({ match: { 'address.postalCode': postalCode } })) } },
          { range: { 'price.amount': { lt: maxPrice } } },
          { range: { 'rooms.numberOfBedrooms': { gte: minRooms } } },
          { range: { 'surface.habitableSurfaceArea.value': { gte: minSurface } } },
          { bool: { should: features.map((feature) => ({ match: { [`amenities.${feature}`]: true } })) } },
        ],
      },
    },
  },
};

const params = {
  filter: Buffer.from(JSON.stringify(filterPayload)).toString('base64'),
  pageSize: 1000,
  sort: '-creationDate',
};

export const endpoint = buildSearchUrl(CENTURY_CONFIG.apiUrl, params);
