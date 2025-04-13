import { generateHash } from '#utils/helpers';
import { AGENCY, BASE_URL } from '#scrapers/realo/constants';

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
        hash: generateHash(`${AGENCY}-${id}`),
        agency: AGENCY,
        type: type.toLowerCase(),
        image: avatarPictureUrl.srcAt2x,
        price,
        zip: address.postalCode,
        city: address.locality,
        surface: habitableArea,
        bedrooms: numberOfBedrooms,
        url: `${BASE_URL}/fr/${address.id}?l=${id}`,
      };
    },
  );
