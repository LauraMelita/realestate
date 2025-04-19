import SEARCH_CONFIG from '#config/search';
import LATOUR_ET_PETIT_CONFIG from '#scrapers/latouretpetit/constants';
import { generateHash } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, zip, city, area, rooms, terrace, garden, url: pathname }) => {
    return {
      hash: generateHash(`${LATOUR_ET_PETIT_CONFIG.title}-${id}`),
      agency: LATOUR_ET_PETIT_CONFIG.title,
      type: SEARCH_CONFIG.category,
      image: pictures[0]?.urlLarge,
      price,
      zip,
      city,
      surface: area,
      bedrooms: rooms,
      terrace: terrace === 1,
      garden: garden === 1,
      url: `${LATOUR_ET_PETIT_CONFIG.baseUrl}/${pathname}`,
    };
  });
