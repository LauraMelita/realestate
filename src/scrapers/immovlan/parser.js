import IMMOVLAN_CONFIG from '#scrapers/immovlan/constants';
import { getCityFromPostalCode } from '#utils/helpers';

const getSurface = (highLights) => {
  const surface = highLights?.find((highLight) => highLight.cssIcon === 'LivableSurface')?.displayValue;

  const isRange = surface?.includes(' - ');

  return isRange ? null : +surface;
};

const hasFeature = (tags, feature) => tags?.includes(IMMOVLAN_CONFIG.featureTags[feature]) || false;

const getPeb = (energyConsumptionGroupCssClass) => {
  const pebMatch = energyConsumptionGroupCssClass?.match(/Brussels([A-G][+-]?)/);

  return pebMatch ? pebMatch[1] : null;
};

export const formatData = (rawData) =>
  rawData.map(
    ({
      id,
      displayImageUrl,
      price,
      displayZipCode,
      structuredData,
      highLights,
      tags,
      energyConsumptionGroupCssClass,
      displayUrl,
    }) => ({
      sourceId: id,
      type: 'apartment',
      image: displayImageUrl,
      price: price || null,
      peb: getPeb(energyConsumptionGroupCssClass),
      zip: displayZipCode,
      city: getCityFromPostalCode(displayZipCode),
      address: null, // Immovlan does not reliably expose addresses
      surface: getSurface(highLights),
      bedrooms: structuredData?.numberOfBedrooms || null,
      terrace: hasFeature(tags, 'terrace'),
      garden: hasFeature(tags, 'garden'),
      url: displayUrl,
    })
  );
