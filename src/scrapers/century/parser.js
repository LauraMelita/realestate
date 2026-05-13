import SEARCH_CONFIG from '#config/search';
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
  const baseUrl = CENTURY_CONFIG.linkUrl;
  const slug = CENTURY_CONFIG.slug[SEARCH_CONFIG.purpose];
  const propertyType = CENTURY_CONFIG.propertyTypes[SEARCH_CONFIG.category];
  const city = slugify(address.city);

  return `${baseUrl}/${slug}/${propertyType}/${city}/${id}`;
};

export const formatData = (rawData) =>
  rawData.map(({ id, images, price, energySpecifications, address, surface, rooms, amenities }) => {
    const postalCode = +address?.postalCode;

    return {
      sourceId: id,
      type: SEARCH_CONFIG.category,
      image: buildImageUrl(id, images),
      price: price.amount,
      peb: energySpecifications?.energyLabel ?? null,
      zip: postalCode,
      city: getCityFromPostalCode(postalCode),
      surface: surface.habitableSurfaceArea.value,
      bedrooms: rooms.numberOfBedrooms,
      terrace: amenities?.terrace === true,
      garden: amenities?.garden === true,
      url: buildUrl(address, id),
    };
  });
