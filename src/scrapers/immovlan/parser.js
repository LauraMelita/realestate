import { generateHash } from '#utils/helpers';
import { AGENCY } from '#scrapers/immovlan/constants';

const getSurface = (highLights) => {
  const surface = highLights?.find(
    (highLight) => highLight.cssIcon === 'LivableSurface',
  )?.displayValue;

  const isRange = surface?.includes(' - ');

  return isRange ? null : +surface;
};

export const formatData = (rawData) =>
  rawData.map(
    ({
      id,
      propertyType,
      displayImageUrl,
      price,
      displayZipCode,
      displayCity,
      structuredData,
      highLights,
      displayUrl,
    }) => {
      return {
        hash: generateHash(`${AGENCY}-${id}`),
        agency: AGENCY,
        type: propertyType === 'appartment' ? 'apartment' : propertyType,
        image: displayImageUrl,
        price: price || null,
        zip: displayZipCode,
        city: displayCity,
        surface: getSurface(highLights),
        bedrooms: structuredData.numberOfBedrooms || null,
        url: displayUrl,
      };
    },
  );
