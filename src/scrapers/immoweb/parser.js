import { generateHash } from '#utils/helpers';

const formatPrice = (price) => {
  return +price.split('\n')[0].replace(/[^\d]/g, '');
};

const formatSurface = (surface) => {
  const match = surface.match(/(\d+)\s*m²/);

  return +match[1];
};

const formatLocality = (locality) => {
  const [postalCode, ...rawCity] = locality.trim().split(' ');

  const city = rawCity
    .join(' ')
    .toLowerCase()
    .replace(/\b\w/g, (match) => match.toUpperCase());

  return {
    postalCode,
    city,
  };
};

export const formatData = (rawData) =>
  rawData.map(({ url, price, surface, locality }) => {
    const { postalCode, city } = formatLocality(locality);
    const formattedPrice = formatPrice(price);
    const formattedSurface = formatSurface(surface);
    const agency = 'immoweb';
    const hashString = `${formattedPrice}-${formattedSurface}-${agency}-${postalCode}-${city}`;

    return {
      hash: generateHash(hashString),
      agency,
      price: formattedPrice,
      postalCode,
      city,
      surface: formattedSurface,
      url,
    };
  });
