import CENTURY_CONFIG from '#scrapers/century/constants';
import { slugify, getCityFromPostalCode } from '#utils/helpers';

const buildImageUrl = (id, images) => {
  if (!images?.length) return null;

  const { name, lastModifiedDate } = images[0];

  const imageMetadata = {
    key: `property-assets/${id}/${name}`,
    lastModifiedDate,
  };

  const encoded = Buffer.from(JSON.stringify(imageMetadata)).toString('base64');

  return `${CENTURY_CONFIG.imageUrl}/${encoded}`;
};

const buildUrl = (address, id) => {
  const city = slugify(address.city);

  return `${CENTURY_CONFIG.linkUrl}/a-vendre/appartement/${city}/${id}`;
};

export const formatData = (rawData) =>
  rawData.map(({ id, images, price, energySpecifications, address, surface, rooms, amenities }) => {
    return {
      sourceId: id,
      type: 'apartment',
      image: buildImageUrl(id, images),
      price: price.amount,
      peb: energySpecifications?.energyLabel ?? null,
      zip: address?.postalCode,
      city: getCityFromPostalCode(address?.postalCode),
      surface: surface.habitableSurfaceArea.value,
      bedrooms: rooms.numberOfBedrooms,
      terrace: amenities?.terrace === true,
      garden: amenities?.garden === true,
      url: buildUrl(address, id),
    };
  });
