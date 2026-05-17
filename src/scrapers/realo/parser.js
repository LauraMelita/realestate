import REALO_CONFIG from '#scrapers/realo/constants';
import { getCityFromPostalCode } from '#utils/helpers';

const buildAddress = (address) => {
  if (!address?.street) return null;

  const normalizedStreet = address.street.replace(/\s+\d+[^\s]*$/u, '').trim();

  return address?.number ? `${normalizedStreet} ${address.number}` : normalizedStreet;
};

export const formatData = (rawData) =>
  rawData.map(({ id, avatarPictureUrl, price, pebIndicator, address, habitableArea, numberOfBedrooms }) => ({
    sourceId: id,
    type: 'apartment',
    image: avatarPictureUrl?.srcAt2x,
    price,
    peb: pebIndicator || null,
    zip: address?.postalCode,
    city: getCityFromPostalCode(address?.postalCode),
    address: buildAddress(address),
    surface: habitableArea,
    bedrooms: numberOfBedrooms,
    terrace: null,
    garden: null,
    url: `${REALO_CONFIG.baseUrl}/fr/${address?.id}?l=${id}`,
  }));
