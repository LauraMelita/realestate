import { getCityFromPostalCode } from '#utils/helpers';

import EXPERTISSIMMO_CONFIG from '#scrapers/expertissimmo/constants';

const buildUrl = (id) => `${EXPERTISSIMMO_CONFIG.baseUrl}/a-vendre/${id}`;

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, energyClass, zip, minArea, rooms, terrace, garden }) => ({
    sourceId: id,
    type: 'apartment',
    image: pictures?.[0]?.urlLarge,
    price,
    peb: energyClass ?? null,
    zip,
    city: getCityFromPostalCode(+zip),
    surface: minArea,
    bedrooms: rooms,
    terrace: terrace === 1,
    garden: garden === 1,
    url: buildUrl(id),
  }));
