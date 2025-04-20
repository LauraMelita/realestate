const SEARCH_CONFIG = {
  category: 'apartment', // or 'house'
  purpose: 'sale', // or 'rent'

  // TODO: When updating locations, make sure to also update corresponding IDs in Realo and Era configs
  locations: [
    { postalCode: 1030, city: 'Schaerbeek' },
    { postalCode: 1060, city: 'Saint-Gilles' },
    { postalCode: 1070, city: 'Anderlecht' },
    { postalCode: 1080, city: 'Molenbeek-Saint-Jean' },
    { postalCode: 1081, city: 'Koekelberg' },
    // { postalCode: 1082, city: 'Berchem-Sainte-Agathe' },
    // { postalCode: 1083, city: 'Ganshoren' },
    { postalCode: 1090, city: 'Jette' },
    { postalCode: 1160, city: 'Auderghem' },
    { postalCode: 1210, city: 'Saint-Josse-ten-Noode' },
  ],

  maxPrice: 350000,
  minRooms: 1,
  minSurface: 85,

  features: [
    { type: 'garden', minSurface: 10 },
    { type: 'terrace', minSurface: 10 },
  ],
};

export default SEARCH_CONFIG;
