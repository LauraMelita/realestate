import SEARCH_CONFIG from '#config/search';
import REALO_CONFIG from '#scrapers/realo/constants';
import { generateHash } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, avatarPictureUrl, price, address, habitableArea, numberOfBedrooms }) => {
    return {
      hash: generateHash(`${REALO_CONFIG.title}-${id}`),
      agency: REALO_CONFIG.title,
      type: SEARCH_CONFIG.category,
      image: avatarPictureUrl.srcAt2x,
      price,
      zip: address.postalCode,
      city: address.locality,
      surface: habitableArea,
      bedrooms: numberOfBedrooms,
      terrace: null,
      garden: null,
      url: `${REALO_CONFIG.baseUrl}/fr/${address.id}?l=${id}`,
    };
  });
