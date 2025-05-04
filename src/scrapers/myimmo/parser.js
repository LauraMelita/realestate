import SEARCH_CONFIG from '#config/search';
import MYIMMO_CONFIG from '#scrapers/myimmo/constants';
import { generateHash } from '#utils/helpers';

const getId = (link) => {
  const match = link?.match(/ref(\d+)/);

  return match ? match[1] : null;
};

const formatPrice = (price) => {
  return parseInt(price?.replace(/[^\d]/g, ''), 10);
};

const formatAddress = (address) => {
  const [, addressParts = ''] = address?.split('\n');
  const [postalCode, ...cityParts] = addressParts.split(' ');

  return {
    postalCode: +postalCode,
    city: cityParts.join(' '),
  };
};

const formatSurface = (surface) => {
  return Number(surface?.replace(',', '.').match(/[\d.]+/)?.[0] || 0);
};

export const formatData = (rawData) =>
  rawData.map(({ image, price, address, surface, bedrooms, link }) => {
    const agency = MYIMMO_CONFIG.title;
    const { postalCode, city } = formatAddress(address);

    return {
      hash: generateHash(`${agency}-${getId(link)}`),
      agency,
      type: SEARCH_CONFIG.category,
      image,
      price: formatPrice(price),
      zip: postalCode,
      city,
      surface: formatSurface(surface),
      bedrooms: +bedrooms,
      terrace: null,
      garden: null,
      url: link,
    };
  });
