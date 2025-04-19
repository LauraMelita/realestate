const IMMOWEB_CONFIG = {
  title: 'Immoweb',
  baseUrl: 'https://www.immoweb.be/en/search',
  slug: {
    sale: 'for-sale',
    rent: 'for-rent',
  },
  features: {
    garden: {
      flag: { hasGarden: true },
      surfaceKey: 'minGardenSurface',
    },
    terrace: {
      flag: { hasGarden: false },
      surfaceKey: 'minTerraceSurface',
    },
  },
  selectors: {
    searchResults: 'ul.search-results__list li.search-results__item',
    nextPage: 'li.pagination__item:last-child a.pagination__link--next',
    link: 'a.card__title-link',
    details: '.card__information--property',
    price: 'p.card--result__price',
    locality: '.card__information.card--results__information--locality',
    image: '.card__media-picture',
  },
};

export default IMMOWEB_CONFIG;
