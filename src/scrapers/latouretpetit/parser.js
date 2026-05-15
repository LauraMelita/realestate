import LATOUR_ET_PETIT_CONFIG from '#scrapers/latouretpetit/constants';
import { getCityFromPostalCode } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, energyClass, zip, area, rooms, terrace, garden, url: pathname }) => {
    return {
      sourceId: id,
      type: 'apartment',
      image: pictures[0]?.urlLarge,
      price,
      peb: energyClass ?? null,
      zip,
      city: getCityFromPostalCode(zip),
      surface: area,
      bedrooms: rooms,
      terrace: terrace === 1,
      garden: garden === 1,
      url: `${LATOUR_ET_PETIT_CONFIG.baseUrl}/${pathname}`,
    };
  });
