import { generateHash } from '#utils/helpers';

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
      const agency = 'Latour & Petit';

      return {
        hash: generateHash(`${agency}-${id}`),
        agency,
        type: category === 1 ? 'house' : 'apartment',
        image: pictures[0]?.urlLarge,
        price,
        zip,
        city,
        surface: area,
        bedrooms: rooms,
        url: `https://latouretpetit.be/${pathname}`,
      };
    },
  );
