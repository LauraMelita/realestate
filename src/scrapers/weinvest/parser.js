import WEINVEST_CONFIG from '#scrapers/weinvest/constants';
import { getCityFromPostalCode, slugify } from '#utils/helpers';

const extractStreetAddress = (name) => {
  const [street] = name?.split(' - ') ?? [];

  return street?.trim() || null;
};

export const formatData = (rawData) =>
  rawData.map(
    ({ id, name, pictures, priceAsAdvertised, energyScore, postalCode, city, livableArea, bedroomCount }) => ({
      sourceId: id,
      type: 'apartment',
      image: pictures?.[0]?.url,
      price: priceAsAdvertised,
      peb: energyScore?.toUpperCase() || null,
      zip: postalCode,
      city: getCityFromPostalCode(postalCode),
      address: extractStreetAddress(name),
      surface: livableArea,
      bedrooms: bedroomCount,
      terrace: null,
      garden: null,
      url: `${WEINVEST_CONFIG.baseUrl}/fr-BE/property/for-sale/${slugify(city)}/apartment/${id}`,
    })
  );
