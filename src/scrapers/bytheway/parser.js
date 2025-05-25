import SEARCH_CONFIG from '#config/search';
import { getCityFromPostalCode } from '#utils/helpers';

const extractId = (link) => {
  const match = link?.match(/\/bien\/(\d+)-/);

  return match[1];
};

const formatPrice = (price) => parseInt(price?.replace(/\D/g, ''), 10);

const formatLocation = (location) => {
  const locationString = location?.split('|')[1]?.trim();
  const postalCode = +locationString?.split(' ')[0];
  const city = getCityFromPostalCode(postalCode);

  return { postalCode, city };
};

export const formatData = (rawData) => {
  return rawData.map(({ link, price, location, image }) => {
    const { postalCode, city } = formatLocation(location);

    return {
      sourceId: extractId(link),
      type: SEARCH_CONFIG.category,
      image,
      price: formatPrice(price),
      zip: postalCode,
      city,
      surface: null,
      bedrooms: null,
      terrace: null,
      garden: null,
      url: link,
    };
  });
};
