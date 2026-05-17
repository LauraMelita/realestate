import ERA_CONFIG from '#scrapers/era/constants';
import { getCityFromPostalCode } from '#utils/helpers';

const formatAddress = (address) => {
  const [street, location] = address?.split(',').map((part) => part.trim()) ?? [];

  const postalCode = +location?.match(/\b\d{4}\b/)?.[0];

  return {
    street: street || null,
    postalCode: postalCode || null,
    city: postalCode ? getCityFromPostalCode(postalCode) : null,
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
    const { street, postalCode, city } = formatAddress(address);

    return {
      sourceId: id,
      type: 'apartment',
      image: `${ERA_CONFIG.baseUrl}${image}`,
      price: formatPrice(price),
      peb: null,
      zip: postalCode,
      city,
      address: street,
      surface: formatSurface(surface),
      bedrooms: formatBedrooms(bedrooms),
      terrace: null,
      garden: null,
      url: `${ERA_CONFIG.baseUrl}${link}`,
    };
  });
