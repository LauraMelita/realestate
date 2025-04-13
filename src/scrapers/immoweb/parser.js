import { generateHash } from '#utils/helpers';
import { AGENCY } from '#scrapers/immoweb/constants';

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

const getCategoryFromURL = (url) => {
  const categorySegment = url.split('/')[5];

  switch (categorySegment) {
    case 'ground-floor':
      return 'apartment';
    case 'loft':
      return 'apartment';
    case 'penthouse':
      return 'apartment';
    case 'new-real-estate-project-apartments':
      return 'apartment';
    default:
      return categorySegment;
  }
};

export const formatData = (rawData) =>
  rawData.map(({ image, price, locality, details, url }) => {
    const { postalCode, city } = formatLocality(locality);
    const { bedrooms, surface } = formatDetails(details);
    const formattedPrice = formatPrice(price);
    const type = getCategoryFromURL(url);
    const hashString = `${AGENCY}-${type}-${formattedPrice}-${postalCode}-${city}-${surface}-${bedrooms}`;

    return {
      hash: generateHash(hashString),
      agency: AGENCY,
      type,
      image,
      price: formattedPrice,
      zip: postalCode,
      city,
      surface,
      bedrooms,
      url,
    };
  });
