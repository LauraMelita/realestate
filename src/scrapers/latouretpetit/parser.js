import { generateHash } from '#utils/helpers';
import { AGENCY, BASE_URL } from '#scrapers/latouretpetit/constants';

export const formatData = (rawData) =>
  rawData?.estates.map(
    ({
      id,
      category,
      pictures,
      price,
      zip,
      city,
      area,
      rooms,
      url: pathname,
    }) => {
      return {
        hash: generateHash(`${AGENCY}-${id}`),
        agency: AGENCY,
        type: category === 1 ? 'house' : 'apartment',
        image: pictures[0]?.urlLarge,
        price,
        zip,
        city,
        surface: area,
        bedrooms: rooms,
        url: `${BASE_URL}/${pathname}`,
      };
    },
  );
