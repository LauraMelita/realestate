import { generateHash } from '#utils/helpers';
import {
  AGENCY,
  IMAGE_URL,
  LISTING_TYPE_MAP,
  TYPE_MAP,
  LINK_URL,
} from '#scrapers/century/constants';

const buildImageUrl = (id, images) => {
  if (!images?.length) return null;

  const { name, lastModifiedDate } = images[0];

  const imageMetadata = {
    key: `property-assets/${id}/${name}`,
    lastModifiedDate,
  };

  const encoded = Buffer.from(JSON.stringify(imageMetadata)).toString('base64');

  return `${IMAGE_URL}/${encoded}`;
};

export const formatData = (rawData) =>
  rawData.map(
    ({ id, type, listingType, images, price, address, surface, rooms }) => {
      const category = TYPE_MAP[type];
      const listing = LISTING_TYPE_MAP[listingType];

      return {
        hash: generateHash(`${AGENCY}-${id}`),
        agency: AGENCY,
        type: type.toLowerCase(),
        image: buildImageUrl(id, images),
        price: price.amount,
        zip: address.postalCode,
        city: address.city,
        surface: surface.habitableSurfaceArea.value,
        bedrooms: rooms.numberOfBedrooms,
        url: `${LINK_URL}/${listing}/${category}/${address.city.toLowerCase()}/${id}`,
      };
    },
  );
