import SEARCH_CONFIG from '#config/search';
import IMMOWEB_CONFIG from '#scrapers/immoweb/constants';
import { getCityFromPostalCode } from '#utils/helpers';

export const formatData = (rawData) =>
  rawData.map(({ id, media, price, property }) => {
    const zipCode = +property.location?.postalCode;
    const city = getCityFromPostalCode(zipCode);

    return {
      sourceId: id,
      type: SEARCH_CONFIG.category,
      image: media?.pictures?.[0]?.largeUrl,
      price: price?.mainValue,
      zip: zipCode,
      city,
      surface: property?.netHabitableSurface,
      bedrooms: property?.bedroomCount,
      terrace: null, // The API does not provide terrace details
      garden: null, // The API does not provide garden details
      url: `${IMMOWEB_CONFIG.linkUrl}/${id}`,
    };
  });
