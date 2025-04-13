import axios from 'axios';

import { API_URL } from '#scrapers/latouretpetit/constants';
import { payload } from '#scrapers/latouretpetit/payload';
import { formatData } from '#scrapers/latouretpetit/parser';

export const scrapeLatourEtPetit = async () => {
  const { data: rawData } = await axios.post(API_URL, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return formatData(rawData);
};
