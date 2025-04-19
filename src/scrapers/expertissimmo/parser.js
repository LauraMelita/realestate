import SEARCH_CONFIG from '#config/search';
import EXPERTISSIMMO_CONFIG from '#scrapers/expertissimmo/constants';
import { generateHash } from '#utils/helpers';

const buildUrl = (id) =>
  `${EXPERTISSIMMO_CONFIG.baseUrl}/${EXPERTISSIMMO_CONFIG.slug[SEARCH_CONFIG.purpose]}/${id}`;

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, zip, city, minArea, rooms, terrace, garden }) => {
    return {
      hash: generateHash(`${EXPERTISSIMMO_CONFIG.title}-${id}`),
      agency: EXPERTISSIMMO_CONFIG.title,
      type: SEARCH_CONFIG.category,
      image: pictures[0].urlLarge,
      price: price,
      zip,
      city,
      surface: minArea,
      bedrooms: rooms,
      terrace: terrace === 1,
      garden: garden === 1,
      url: buildUrl(id),
    };
  });
