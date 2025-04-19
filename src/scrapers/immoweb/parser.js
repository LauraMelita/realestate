import SEARCH_CONFIG from '#config/search';
import IMMOWEB_CONFIG from '#scrapers/immoweb/constants';
import { generateHash } from '#utils/helpers';

const formatPrice = (price) => {
  return +price.split('\n')[0].replace(/[^\d]/g, '');
};

const formatDetails = (details) => {
  const bedroomsMatch = details.match(/(?:-|\b)?\s*(\d+)\s*bdr/i);
  const surfaceMatch = details.match(/(\d+)\s*m²/);

  return {
    bedrooms: bedroomsMatch ? +bedroomsMatch[1] : null,
    surface: surfaceMatch ? +surfaceMatch[1] : null,
  };
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
  rawData.map(({ image, price, locality, details, url }) => {
    const { postalCode, city } = formatLocality(locality);
    const { bedrooms, surface } = formatDetails(details);
    const formattedPrice = formatPrice(price);
    const agency = IMMOWEB_CONFIG.title;
    const type = SEARCH_CONFIG.category;
    const hashString = `${agency}-${type}-${formattedPrice}-${postalCode}-${city}-${surface}-${bedrooms}`;

    return {
      hash: generateHash(hashString),
      agency,
      type,
      image,
      price: formattedPrice,
      zip: postalCode,
      city,
      surface,
      bedrooms,
      garden: null, // TODO
      terrace: null, // TODO
      url,
    };
  });
