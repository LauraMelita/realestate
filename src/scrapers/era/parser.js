import { generateHash } from '#utils/helpers';

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
    const agency = 'Era';
    const baseUrl = 'https://www.era.be';

    return {
      hash: generateHash(`${agency}-${id}`),
      agency,
      type: getCategoryFromURL(`${baseUrl}${link}`),
      image: `${baseUrl}${image}`,
      price: formatPrice(price),
      zip: postalCode,
      city,
      surface: formatSurface(surface),
      bedrooms: formatBedrooms(bedrooms),
      url: `${baseUrl}${link}`,
    };
  });
