import REALO_CONFIG from '#scrapers/realo/constants';
import { getCityFromPostalCode } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, avatarPictureUrl, price, pebIndicator, address, habitableArea, numberOfBedrooms }) => ({
    sourceId: id,
    type: 'apartment',
    image: avatarPictureUrl?.srcAt2x,
    price,
    peb: pebIndicator || null,
    zip: address?.postalCode,
    city: getCityFromPostalCode(address?.postalCode),
    surface: habitableArea,
    bedrooms: numberOfBedrooms,
    terrace: null,
    garden: null,
    url: `${REALO_CONFIG.baseUrl}/fr/${address?.id}?l=${id}`,
  }));
