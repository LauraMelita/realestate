import SEARCH_CONFIG from '#config/search';
import IMMOABITA_CONFIG from '#scrapers/immoabita/constants';
import { getCityFromPostalCode } from '#utils/helpers';

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
      url: `${IMMOABITA_CONFIG.baseUrl}/en/bien/?estateid=${id}`,
    };
  });
