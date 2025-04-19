import SEARCH_CONFIG from '#config/search';
import IMMOVLAN_CONFIG from '#scrapers/immovlan/constants';
import { generateHash } from '#utils/helpers';

const getSurface = (highLights) => {
  const surface = highLights?.find(
    (highLight) => highLight.cssIcon === 'LivableSurface',
  )?.displayValue;

  const isRange = surface?.includes(' - ');

  return isRange ? null : +surface;
};

const hasFeature = (tags, feature) =>
  tags?.includes(IMMOVLAN_CONFIG.features[feature]) || false;

export const formatData = (rawData) =>
  rawData.map(
    ({
      id,
      displayImageUrl,
      price,
      displayZipCode,
      displayCity,
      structuredData,
      highLights,
      tags,
      displayUrl,
    }) => {
      return {
        hash: generateHash(`${IMMOVLAN_CONFIG.title}-${id}`),
        agency: IMMOVLAN_CONFIG.title,
        type: SEARCH_CONFIG.category,
        image: displayImageUrl,
        price: price || null,
        zip: displayZipCode,
        city: displayCity,
        surface: getSurface(highLights),
        bedrooms: structuredData.numberOfBedrooms || null,
        terrace: hasFeature(tags, 'terrace'),
        garden: hasFeature(tags, 'garden'),
        url: displayUrl,
      };
    },
  );
