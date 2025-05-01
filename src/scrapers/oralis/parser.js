import SEARCH_CONFIG from '#config/search';
import ORALIS_CONFIG from '#scrapers/oralis/constants';
import { generateHash } from '#utils/helpers';

const getId = (link) => link?.split('/').pop();

const formatPrice = (price) => parseInt(price.replace(/[^\d]/g, ''), 10);

const getPostalCode = (city) =>
  SEARCH_CONFIG.locations.find((location) => location.city === city)?.postalCode;

const formatSurface = (surface) => {
  const match = surface.replace(',', '.').match(/([\d.]+)\s*(m²|m2)/i);

  return +match?.[1];
};

export const formatData = (rawData) =>
  rawData.map(({ image, price, city, surface, bedrooms, link }) => {
    const agency = ORALIS_CONFIG.title;

    return {
      hash: generateHash(`${agency}-${getId(link)}`),
      agency,
      type: SEARCH_CONFIG.category,
      image,
      price: formatPrice(price),
      zip: getPostalCode(city),
      city,
      surface: formatSurface(surface),
      bedrooms: +bedrooms,
      terrace: null,
      garden: null,
      url: `${ORALIS_CONFIG.baseUrl}${link}`,
    };
  });
