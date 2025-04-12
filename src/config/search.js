const SEARCH_PARAMS = {
  category: 'apartment',
  locations: [
    {
      postalCode: '1083',
      city: 'Ganshoren',
      eraId: '2879',
      realoId: '5194012',
    },
    {
      postalCode: '1081',
      city: 'Koekelberg',
      eraId: '2881',
      realoId: '5194015',
    },
    { postalCode: '1090', city: 'Jette', eraId: '2880', realoId: '5194014' },
    {
      postalCode: '1082',
      city: 'Berchem-Sainte-Agathe',
      eraId: '2883',
      realoId: '5194007',
    },
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
