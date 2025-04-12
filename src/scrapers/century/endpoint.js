import SEARCH_PARAMS from '#config/search';
import { buildSearchUrl } from '#utils/helpers';

const { category, locations, maxPrice, minSurface, features } = SEARCH_PARAMS;

const BASE_URL = 'https://api.prd.cloud.century21.be/api/v2/properties';

const filterPayload = {
  bool: {
    filter: {
      bool: {
        must: [
          { match: { listingType: 'FOR_SALE' } },
          {
            bool: {
              should: [{ match: { 'address.countryCode': 'be' } }],
            },
          },
          { match: { type: category.toUpperCase() } },
          {
            bool: {
              should: locations.map(({ postalCode }) => ({
                match: { 'address.postalCode': postalCode },
              })),
            },
          },
          {
            range: {
              'price.amount': {
                lt: maxPrice,
              },
            },
          },
          {
            range: {
              'surface.habitableSurfaceArea.value': {
                gte: +minSurface,
              },
            },
          },
          {
            bool: {
              should: features.map(({ type }) => ({
                match: { [`amenities.${type}`]: 'true' },
              })),
            },
          },
        ],
      },
    },
  },
};

const PARAMS = {
  filter: Buffer.from(JSON.stringify(filterPayload)).toString('base64'),
  pageSize: 1000,
  sort: '-creationDate',
};

export const endpoint = buildSearchUrl(BASE_URL, PARAMS);
