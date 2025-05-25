import SEARCH_CONFIG from '#config/search';
import EXPERTISSIMMO_CONFIG from '#scrapers/expertissimmo/constants';
import { getCityFromPostalCode } from '#utils/helpers';

const buildUrl = (id) =>
  `${EXPERTISSIMMO_CONFIG.baseUrl}/${EXPERTISSIMMO_CONFIG.slug[SEARCH_CONFIG.purpose]}/${id}`;

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, zip, minArea, rooms, terrace, garden }) => {
    return {
      sourceId: id,
      type: SEARCH_CONFIG.category,
      image: pictures[0].urlLarge,
      price,
      zip,
      city: getCityFromPostalCode(+zip),
      surface: minArea,
      bedrooms: rooms,
      terrace: terrace === 1,
      garden: garden === 1,
      url: buildUrl(id),
    };
  });
