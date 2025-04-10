import axios from 'axios';

import { logScraperStart } from '#services/logger';

import { payload } from '#scrapers/latouretpetit/payload';
import { formatData } from '#scrapers/latouretpetit/parser';

const BASE_URL = 'https://latouretpetit.be/api/estates/sales';

export const scrapeLatourEtPetit = async () => {
  const { data: rawData } = await axios.post(BASE_URL, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  logScraperStart('Latour & Petit', null, BASE_URL);

  return formatData(rawData);
};
