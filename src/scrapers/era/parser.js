import SEARCH_CONFIG from '#config/search';
import ERA_CONFIG from '#scrapers/era/constants';
import { getCityFromPostalCode } from '#utils/helpers';

const formatAddress = (address, link) => {
  const postalCode = +address?.match(/\b\d{4}\b/)?.[0];

  if (postalCode) return { postalCode, city: getCityFromPostalCode(postalCode) };

  const fallbackLocation = SEARCH_CONFIG.locations.find(({ city }) => link?.toLowerCase().includes(city.toLowerCase()));

  return {
    postalCode: fallbackLocation?.postalCode ?? null,
    city: fallbackLocation?.city ?? null,
  };
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
  const bedroomsMatch = bedrooms?.match(/(\d+)/);

  return bedroomsMatch ? +bedroomsMatch[1] : null;
};

export const formatData = (rawData) =>
  rawData.map(({ id, image, price, address, surface, bedrooms, link }) => {
    const { postalCode, city } = formatAddress(address, link);

    return {
      sourceId: id,
      type: 'apartment',
      image: `${ERA_CONFIG.baseUrl}${image}`,
      price: formatPrice(price),
      peb: null,
      zip: postalCode,
      city,
      surface: formatSurface(surface),
      bedrooms: formatBedrooms(bedrooms),
      terrace: null,
      garden: null,
      url: `${ERA_CONFIG.baseUrl}${link}`,
    };
  });
