const WEINVEST_CONFIG = {
  apiUrl: 'https://thor-cms.weinvest.app/api/properties/search',
  baseUrl: 'https://weinvest.be',
  zipIds: {
    1030: 487, // Schaerbeek
    1040: 134, // Etterbeek
    1060: 33, // Saint-Gilles
    1070: 85, // Anderlecht
    1080: 86, // Molenbeek-Saint-Jean
    1081: 488, // Koekelberg
    1082: 489, // Berchem-Sainte-Agathe
    1083: 288, // Ganshoren
    1090: 231, // Jette
    1160: 490, // Auderghem
    1210: 387, // Saint-Josse-ten-Noode
  },
  supportedExteriorFilters: {
    garden: 'garden',
    terrace: 'terrace',
  },
};

export default WEINVEST_CONFIG;
