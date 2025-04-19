const EXPERTISSIMMO_CONFIG = {
  title: 'Expertissimmo',
  apiUrl:
    'https://expertissimmo.eu/fr/proxy/https://api.whise.eu/v1/estates/list/proxydata',
  baseUrl: 'https://expertissimmo.eu/fr/nos-biens',
  slug: {
    sale: 'a-vendre',
    rent: 'a-louer',
  },
  propertyType: {
    house: 1,
    apartment: 2,
  },
  listingType: {
    sale: 1,
    rent: 2,
  },
  status: [
    1, // Published
    5, // Coming soon
  ],
};

export default EXPERTISSIMMO_CONFIG;
