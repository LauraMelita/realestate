import LATOUR_ET_PETIT_CONFIG from '#scrapers/latouretpetit/constants';
import { getCityFromPostalCode } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, energyClass, zip, displayAddress, name, area, rooms, terrace, garden, url }) => {
    return {
      sourceId: id,
      type: 'apartment',
      image: pictures[0]?.urlLarge,
      price,
      peb: energyClass ?? null,
      zip,
      city: getCityFromPostalCode(zip),
      address: displayAddress && name ? name : null,
      surface: area,
      bedrooms: rooms,
      terrace: terrace === 1,
      garden: garden === 1,
      url: `${LATOUR_ET_PETIT_CONFIG.baseUrl}/en${url}`,
    };
  });
