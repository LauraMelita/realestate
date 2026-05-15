const MYIMMO_CONFIG = {
  baseUrl: 'https://www.myimmo.be',
  selectors: {
    card: '.photoTexte',
    nextPage: '.blocTexte.pagination a.active + a',
    link: '.texte a.titreMain',
    price: '.texte .prix',
    peb: '.photo .peb',
    status: '.photo .statut',
    surface: 'li.int',
    bedrooms: 'li.ch',
    address: '.texte .adresse',
    image: '.photo .slider img',
  },
};

export default MYIMMO_CONFIG;
