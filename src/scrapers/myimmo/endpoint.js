import SEARCH_CONFIG from '#config/search';
import MYIMMO_CONFIG from '#scrapers/myimmo/constants';
import { buildPHPSearchUrl } from '#utils/helpers';

const params = {
  reference: '',
  typeFilter: 2, // apartment
  cityFilter: SEARCH_CONFIG.locations.map(({ city }) => city),
  priceFilter: `0|${SEARCH_CONFIG.maxPrice}`,
};

export const endpoint = buildPHPSearchUrl(`${MYIMMO_CONFIG.baseUrl}/fr/vente.php`, params);
