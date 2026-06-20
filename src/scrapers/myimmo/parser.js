import MYIMMO_CONFIG from '#scrapers/myimmo/constants';
import { getCityFromPostalCode } from '#utils/helpers';

const buildAddress = (street, number) => {
  if (!street) return null;

  const formattedStreet = street.trim();

  return number ? `${formattedStreet} ${number}` : formattedStreet;
};

export const formatData = (rawData) =>
  rawData.map(({ id, pictures, price, energyClass, zip, address, number, area, rooms, terrace, garden }) => {
    return {
      sourceId: id,
      type: 'apartment',
      image: pictures?.[0]?.urlLarge,
      price,
      peb: energyClass ?? null,
      zip,
      city: getCityFromPostalCode(zip),
      address: buildAddress(address, number),
      surface: area,
      bedrooms: rooms,
      terrace: !!terrace,
      garden: !!garden,
      url: `${MYIMMO_CONFIG.baseUrl}/properties/${id}`,
    };
  });
