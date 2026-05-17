import EXPERTISSIMMO_CONFIG from '#scrapers/expertissimmo/constants';
import { getCityFromPostalCode } from '#utils/helpers';

const buildUrl = (id) => `${EXPERTISSIMMO_CONFIG.baseUrl}/a-vendre/${id}`;

const buildAddress = (street, number) => {
  if (!street) return null;

  return number ? `${street} ${number}` : street;
};

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, energyClass, zip, address, number, minArea, rooms, terrace, garden }) => ({
    sourceId: id,
    type: 'apartment',
    image: pictures?.[0]?.urlLarge,
    price,
    peb: energyClass ?? null,
    zip,
    city: getCityFromPostalCode(zip),
    address: buildAddress(address, number),
    surface: minArea,
    bedrooms: rooms,
    terrace: terrace === 1,
    garden: garden === 1,
    url: buildUrl(id),
  }));
