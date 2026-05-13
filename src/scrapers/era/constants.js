const ERA_CONFIG = {
  apiUrl: 'https://www.era.be/fr/jsonapi/index/property_index',
  baseUrl: 'https://www.era.be',
  zipIds: {
    1080: 2885, // Molenbeek-Saint-Jean
    1081: 2881, // Koekelberg
    1082: 2883, // Berchem-Sainte-Agathe
    1083: 2879, // Ganshoren
    1090: 2880, // Jette
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
