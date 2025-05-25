const ORALIS_CONFIG = {
  baseUrl: 'https://www.oralis.be',
  propertyTypes: {
    house: 1,
    apartment: 2,
  },
  listingTypes: {
    sale: 1,
    rent: 2,
  },
  selectors: {
    card: '.estate-card-v2',
    price: '.estate-description__price',
    city: '.estate-description__town',
    surface: '.fa-expand-arrows',
    bedrooms: '.fa-bed',
    image: '.estate-card-v2__photo img',
    flag: '.estate-flag__text',
  },
};

export default ORALIS_CONFIG;
