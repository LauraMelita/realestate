const SEARCH_PARAMS = {
  category: { code: '2', name: 'apartment' },
  locations: [
    { postalCode: '1083', city: 'Ganshoren' },
    { postalCode: '1081', city: 'Koekelberg' },
    { postalCode: '1090', city: 'Jette' },
    { postalCode: '1082', city: 'Berchem-Sainte-Agathe' },
  ],
  maxPrice: '350000',
  minRooms: '1',
  minSurface: '85',
  features: [
    { type: 'garden', minSurface: '10' },
    { type: 'terrace', minSurface: '10' },
  ],
};

export default SEARCH_PARAMS;
