import SEARCH_CONFIG from '#config/search';
import BYTHEWAY_CONFIG from '#scrapers/bytheway/constants';
import { generateHash } from '#utils/helpers';

const extractId = (link) => {
  const match = link?.match(/\/bien\/(\d+)-/);

  return match[1];
};

const formatPrice = (price) => parseInt(price.replace(/\D/g, ''), 10);

const formatLocation = (location) => {
  const locationString = location.split('|')[1]?.trim();
  const [postalCode, city] = locationString.split(' ');

  return { postalCode, city };
};

export const formatData = (rawData) => {
  return rawData.map(({ link, price, location, image }) => {
    const { postalCode, city } = formatLocation(location);

    return {
      hash: generateHash(`${BYTHEWAY_CONFIG.title}-${extractId(link)}`),
      agency: BYTHEWAY_CONFIG.title,
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
