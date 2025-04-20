const BYTHEWAY_CONFIG = {
  title: 'By the Way',
  apiUrl: 'https://bytheway.immo/wp-admin/admin-ajax.php',
  propertyType: {
    house: 'maison',
    apartment: 'appartement',
  },
  // NOTE: By The Way doesn't have listings for Koekelberg
  zipIds: {
    1030: 517, // Schaerbeek
    1060: 475, // Saint-Gilles
    1070: 252, // Anderlecht
    1080: 389, // Molenbeek-Saint-Jean
    1082: 249, // Berchem-Sainte-Agathe
    1083: 268, // Ganshoren
    1090: 411, // Jette
    1160: 261, // Auderghem
    1210: 276, // Saint-Josse-ten-Noode
  },
  selectors: {
    items: '.jet-listing-grid__item',
    title: 'h2.elementor-heading-title',
    link: '.jet-engine-listing-overlay-wrap',
    price: '[data-id="5c4ce92"] .jet-listing-dynamic-field__content',
    location: '.elementor-element-3f657c0',
    image: 'img.swiper-slide-image',
  },
};

export default BYTHEWAY_CONFIG;
