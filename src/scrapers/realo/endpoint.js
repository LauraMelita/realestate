import SEARCH_CONFIG from '#config/search';
import REALO_CONFIG from '#scrapers/realo/constants';

const { locations, maxPrice, minRooms, minSurface, features } = SEARCH_CONFIG;
const amenities = features.map((feature) => REALO_CONFIG.amenities[feature]).filter(Boolean);

const params = new URLSearchParams();

params.append('boundaryAddressIds', locations.map(({ postalCode }) => REALO_CONFIG.zipIds[postalCode]).join(','));
params.append('ways[]', 'SALE');
params.append('types[]', 'APARTMENT');
params.append('priceMax', maxPrice);
params.append('bedroomsMin', minRooms);
params.append('habitablesizeMin', minSurface);
amenities.forEach((amenity) => params.append('amenities[]', amenity));
params.append('isMapSearch', 'false');
params.append('isListSearch', 'true');
params.append('isLocationChange', 'true');

export const endpoint = `${REALO_CONFIG.apiUrl}?${params.toString()}`;
