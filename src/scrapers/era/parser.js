import SEARCH_CONFIG from '#config/search';
import ERA_CONFIG from '#scrapers/era/constants';
import { getCityFromPostalCode } from '#utils/helpers';

const formatAddress = (address) => {
  const [, postalCode, rawCity] = address.match(/,\s*(\d{4})\s+(.+)$/);
  const city = getCityFromPostalCode(+postalCode);

  return { postalCode, city };
};

const formatPrice = (price) => {
  const formattedPrice = +price?.split('\n')[0].replace(/[^\d]/g, '');

  return formattedPrice > 0 ? formattedPrice : null;
};

const formatSurface = (surface) => {
  const surfaceMatch = surface?.match(/(\d+)/);

  return surfaceMatch ? +surfaceMatch[1] : null;
};

const formatBedrooms = (bedrooms) => {
  const bedroomsMatch = bedrooms.match(/(\d+)/);

  return bedroomsMatch ? +bedroomsMatch[1] : null;
};

export const formatData = (rawData) =>
  rawData.map(({ id, image, price, address, surface, bedrooms, link }) => {
    const { postalCode, city } = formatAddress(address);

    return {
      sourceId: id,
      type: SEARCH_CONFIG.category,
      image: `${ERA_CONFIG.baseUrl}${image}`,
      price: formatPrice(price),
      zip: postalCode,
      city,
      surface: formatSurface(surface),
      bedrooms: formatBedrooms(bedrooms),
      terrace: null,
      garden: null,
      url: `${ERA_CONFIG.baseUrl}${link}`,
    };
  });
