import SEARCH_CONFIG from '#config/search';
import WEINVEST_CONFIG from '#scrapers/weinvest/constants';

const { locations, maxPrice, minRooms, minSurface, features } = SEARCH_CONFIG;

const buildEndpoint = (exteriorFilter) => {
  const params = new URLSearchParams();

  params.append('transactionType', 'for-sale');
  params.append('category[0]', 'apartment');
  params.append('includeInOptionState', 'false');
  params.append('includeSold', 'exclude');
  params.append('bedroomCount', minRooms);
  params.append('livableArea', minSurface);
  params.append('includeWithExteriorSpace', exteriorFilter);

  locations
    .map(({ postalCode }) => WEINVEST_CONFIG.zipIds[postalCode])
    .filter(Boolean)
    .forEach((id, index) => {
      params.append(`location[municipalityIds][${index}]`, id);
    });

  params.append('budget[max]', maxPrice);
  params.append('country', 'be');
  params.append('groupProjects', 'true');
  params.append('locale', 'fr-BE');
  params.append('orderBy', 'relevance.ASC');
  params.append('pagination[limit]', '1000');
  params.append('pagination[offset]', '0');

  return `${WEINVEST_CONFIG.apiUrl}?${params.toString()}`;
};

const exteriorFilters = features.map((feature) => WEINVEST_CONFIG.supportedExteriorFilters[feature]);

export const endpoints = exteriorFilters.length
  ? exteriorFilters.map((exteriorFilter) => buildEndpoint(exteriorFilter))
  : [buildEndpoint('no_matter')];
