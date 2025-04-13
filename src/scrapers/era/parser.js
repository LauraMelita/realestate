import { generateHash } from '#utils/helpers';
import { AGENCY, BASE_URL } from '#scrapers/era/constants';

const formatAddress = (address) => {
  const [, postalCode, rawCity] = address.match(/,\s*(\d{4})\s+(.+)$/);

  const city = rawCity.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

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

const getCategoryFromURL = (url) => {
  const categorySegment = new URL(url).pathname.split('/')[4];

  if (categorySegment === 'house') return 'house';
  if (categorySegment === 'flat-apartment') return 'apartment';
};

export const formatData = (rawData) =>
  rawData.map(({ id, image, price, address, surface, bedrooms, link }) => {
    const { postalCode, city } = formatAddress(address);

    return {
      hash: generateHash(`${AGENCY}-${id}`),
      agency: AGENCY,
      type: getCategoryFromURL(`${BASE_URL}${link}`),
      image: `${BASE_URL}${image}`,
      price: formatPrice(price),
      zip: postalCode,
      city,
      surface: formatSurface(surface),
      bedrooms: formatBedrooms(bedrooms),
      url: `${BASE_URL}${link}`,
    };
  });
