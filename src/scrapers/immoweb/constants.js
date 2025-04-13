export const AGENCY = 'Immoweb';

export const BASE_URL = 'https://www.immoweb.be/en/search';

export const FEATURE_PARAMS = {
  garden: {
    flag: { hasGarden: true },
    surfaceKey: 'minGardenSurface',
  },
  terrace: {
    flag: { hasGarden: false },
    surfaceKey: 'minTerraceSurface',
  },
};

export const PAGE_SELECTORS = {
  searchResults: 'ul.search-results__list li.search-results__item',
  nextPage: 'li.pagination__item:last-child a.pagination__link--next',
  link: 'a.card__title-link',
  details: '.card__information--property',
  price: 'p.card--result__price',
  locality: '.card__information.card--results__information--locality',
  image: '.card__media-picture',
};
