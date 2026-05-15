import { getCityFromPostalCode } from '#utils/helpers';

const getId = (link) => {
  const match = link?.match(/ref(\d+)/);

  return match ? match[1] : null;
};

const formatPrice = (price) => parseInt(price?.replace(/[^\d]/g, ''), 10) || null;

const formatPeb = (pebUrl) => {
  const pebMatch = pebUrl?.match(/peb_([a-g][+-]?)/i);

  return pebMatch ? pebMatch[1].toUpperCase() : null;
};

const formatAddress = (address) => {
  const [, addressParts = ''] = address?.split('\n');
  const [postalCode, ...cityParts] = addressParts.split(' ');

  return {
    postalCode: postalCode,
    city: getCityFromPostalCode(postalCode),
  };
};

const formatSurface = (surface) => {
  return Number(surface?.replace(',', '.').match(/[\d.]+/)?.[0] || 0);
};

export const formatData = (rawData) =>
  rawData.map(({ image, price, peb, address, surface, bedrooms, link }) => {
    const { postalCode, city } = formatAddress(address);

    return {
      sourceId: getId(link),
      type: 'apartment',
      image,
      price: formatPrice(price),
      peb: formatPeb(peb),
      zip: postalCode,
      city,
      surface: formatSurface(surface),
      bedrooms,
      terrace: null,
      garden: null,
      url: link,
    };
  });
