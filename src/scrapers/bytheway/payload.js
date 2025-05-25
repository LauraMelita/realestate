import qs from 'qs';

import SEARCH_CONFIG from '#config/search';
import BYTHEWAY_CONFIG from '#scrapers/bytheway/constants';

const zipIds = SEARCH_CONFIG.locations.map(({ postalCode }) => BYTHEWAY_CONFIG.zipIds[postalCode]);
const category = BYTHEWAY_CONFIG.propertyTypes[SEARCH_CONFIG.category];
const priceRange = `0_${SEARCH_CONFIG.maxPrice}`;

const params = {
  action: 'jet_smart_filters',
  provider: 'jet-engine/default',
  'query[_meta_query_wpis_category_label]': category,
  'query[_tax_query_estate_cities_zips]': zipIds,
  'query[_meta_query_wpis_finance_price|range]': priceRange,
  'query[_meta_query_wpis_configuration_terraces]': 1,
  'defaults[post_status][]': 'publish',
  'defaults[post_type]': 'wpis_estates',
  'defaults[posts_per_page]': 1000,
  'defaults[paged]': 1,
  'defaults[ignore_sticky_posts]': 1,
  'defaults[orderby][wpis_id]': 'DESC',
  'defaults[orderby][wpis_status_label]': 'ASC',
  'defaults[meta_key]': 'wpis_id',
  'defaults[meta_type]': 'NUMERIC',
  'defaults[meta_query][0][key]': 'wpis_purpose_id',
  'defaults[meta_query][0][value]': '1,3',
  'defaults[meta_query][0][compare]': '=',
  'defaults[meta_query][0][type]': 'NUMERIC',
  'defaults[meta_query][1][key]': 'wpis_properties_hasParent',
  'defaults[meta_query][1][value]': 0,
  'defaults[meta_query][1][compare]': '=',
  'defaults[meta_query][1][type]': 'NUMERIC',
  'defaults[meta_query][relation]': 'AND',
  'settings[lisitng_id]': 368,
  'settings[post_status][]': 'publish',
  'settings[posts_num]': 6,
  'settings[max_posts_num]': 9,
  'settings[custom_post_types][]': 'wpis_estates',
  'settings[speed]': 500,
  'props[found_posts]': 0,
  'props[max_num_pages]': 0,
  'props[page]': 1,
};

export const payload = qs.stringify(params, { arrayFormat: 'brackets' });
