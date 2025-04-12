import { generateHash } from '#utils/helpers';

const TYPE_MAP = {
  APARTMENT: 'appartement',
  HOUSE: 'maison',
};

const LISTING_TYPE_MAP = {
  FOR_SALE: 'a-vendre',
  FOR_RENT: 'a-louer',
};

const buildImageUrl = (id, images) => {
  if (!images?.length) return null;

  const { name, lastModifiedDate } = images[0];

  const imageMetadata = {
    key: `property-assets/${id}/${name}`,
    lastModifiedDate,
  };

  const encoded = Buffer.from(JSON.stringify(imageMetadata)).toString('base64');

  return `https://images.century21.be/${encoded}`;
};

export const formatData = (rawData) =>
  rawData.map(
    ({ id, type, listingType, images, price, address, surface, rooms }) => {
      const agency = 'Century 21';
      const category = TYPE_MAP[type];
      const listing = LISTING_TYPE_MAP[listingType];

      return {
        hash: generateHash(`${agency}-${id}`),
        agency,
        type: type.toLowerCase(),
        image: buildImageUrl(id, images),
        price: price.amount,
        zip: address.postalCode,
        city: address.city,
        surface: surface.habitableSurfaceArea.value,
        bedrooms: rooms.numberOfBedrooms,
        url: `https://www.century21.be/fr/properiete/${listing}/${category}/${address.city.toLowerCase()}/${id}`,
      };
    },
  );
