const ERA_CONFIG = {
  apiUrl: 'https://www.era.be/en/jsonapi/index/property_index',
  baseUrl: 'https://www.era.be',
  propertyTypes: {
    house: '46',
    apartment: '44',
  },
  zipIds: {
    1030: 2875, // Schaerbeek
    1040: 2878, // Etterbeek
    1060: 2884, // Saint-Gilles
    1070: 2876, // Anderlecht
    1080: 2885, // Molenbeek-Saint-Jean
    1081: 2881, // Koekelberg
    1082: 2883, // Berchem-Sainte-Agathe
    1083: 2879, // Ganshoren
    1090: 2880, // Jette
    1160: 2882, // Auderghem
    1210: 2886, // Saint-Josse-ten-Noode
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
