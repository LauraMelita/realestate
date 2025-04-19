const ERA_CONFIG = {
  title: 'Era',
  apiUrl: 'https://www.era.be/en/jsonapi/index/property_index',
  baseUrl: 'https://www.era.be',
  propertyType: {
    house: '46',
    apartment: '44',
  },
  zipIds: {
    1083: 2879, // Ganshoren
    1081: 2881, // Koekelberg
    1090: 2880, // Jette
    1082: 2883, // Berchem-Sainte-Agathe
  },
  selectors: {
    link: '.rs-canonical-link-formatter a',
    price: '.field--price',
    address: '.field--address',
    surface: '.field--habitable-space',
    bedrooms: '.field--bedrooms',
    image: 'img.image',
  },
};

export default ERA_CONFIG;
