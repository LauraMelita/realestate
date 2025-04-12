import { generateHash } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(
    ({
      id,
      type,
      avatarPictureUrl,
      price,
      address,
      habitableArea,
      numberOfBedrooms,
    }) => {
      const agency = 'Realo';

      return {
        hash: generateHash(`${agency}-${id}`),
        agency,
        type: type.toLowerCase(),
        image: avatarPictureUrl.srcAt2x,
        price,
        zip: address.postalCode,
        city: address.locality,
        surface: habitableArea,
        bedrooms: numberOfBedrooms,
        url: `https://www.realo.be/fr/${address.id}?l=${id}`,
      };
    },
  );
