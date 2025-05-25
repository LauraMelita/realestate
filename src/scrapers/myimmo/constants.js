const MYIMMO_CONFIG = {
  baseUrl: 'https://www.myimmo.be',
  propertyTypes: {
    house: 1,
    apartment: 2,
  },
  listingTypes: {
    sale: 'vente',
    rent: 'location',
  },
  selectors: {
    card: '.photoTexte',
    nextPage: '.blocTexte.pagination a.active + a',
    link: '.texte a.titreMain',
    price: '.texte .prix',
    surface: 'li.int',
    bedrooms: 'li.ch',
    address: '.texte .adresse',
    image: '.photo .slider img',
  },
};

export default MYIMMO_CONFIG;
