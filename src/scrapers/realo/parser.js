import SEARCH_CONFIG from '#config/search';
import REALO_CONFIG from '#scrapers/realo/constants';
import { getCityFromPostalCode } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, avatarPictureUrl, price, address, habitableArea, numberOfBedrooms }) => {
    const postalCode = +address?.postalCode;

    return {
      sourceId: id,
      type: SEARCH_CONFIG.category,
      image: avatarPictureUrl?.srcAt2x,
      price,
      zip: postalCode,
      city: getCityFromPostalCode(postalCode),
      surface: habitableArea,
      bedrooms: numberOfBedrooms,
      terrace: null,
      garden: null,
      url: `${REALO_CONFIG.baseUrl}/fr/${address?.id}?l=${id}`,
    };
  });
