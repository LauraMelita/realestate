import SEARCH_CONFIG from '#config/search';
import IMMOABITA_CONFIG from '#scrapers/immoabita/constants';
import { generateHash } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, zip, city, minArea, rooms, terrace, garden }) => {
    return {
      hash: generateHash(`${IMMOABITA_CONFIG.title}-${id}`),
      agency: IMMOABITA_CONFIG.title,
      type: SEARCH_CONFIG.category,
      image: pictures[0].urlLarge,
      price,
      zip,
      city,
      surface: minArea,
      bedrooms: rooms,
      terrace: terrace === 1,
      garden: garden === 1,
      url: `${IMMOABITA_CONFIG.baseUrl}/en/bien/?estateid=${id}`,
    };
  });
