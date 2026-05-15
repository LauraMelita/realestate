import IMMOABITA_CONFIG from '#scrapers/immoabita/constants';
import { getCityFromPostalCode } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, energyClass, zip, minArea, rooms, terrace, garden }) => ({
    sourceId: id,
    type: 'apartment',
    image: pictures?.[0]?.urlLarge,
    price,
    peb: energyClass ?? null,
    zip,
    city: getCityFromPostalCode(zip),
    surface: minArea,
    bedrooms: rooms,
    terrace: terrace === 1,
    garden: garden === 1,
    url: `${IMMOABITA_CONFIG.baseUrl}/en/bien/?estateid=${id}`,
  }));
