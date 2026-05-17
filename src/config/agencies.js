import {
  scrapeCentury,
  scrapeEra,
  scrapeExpertissimmo,
  scrapeImmovlan,
  scrapeLatourEtPetit,
  scrapeMyimmo,
  scrapeRealo,
} from '#scrapers/index';

const AGENCIES = [
  {
    name: 'century',
    label: 'Century 21',
    method: scrapeCentury,
    enabled: true,
    frequency: '3,53 6-23 * * *', // Runs at minute 03 and 53 every hour from 06:00 to 23:59
    hasLinkPreview: false,
  },
  {
    name: 'era',
    label: 'ERA',
    method: scrapeEra,
    enabled: true,
    frequency: '8,43 6-23 * * *', // Runs at minute 08 and 43 every hour from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'expertissimo',
    label: 'Expertissimmo',
    method: scrapeExpertissimmo,
    enabled: true,
    frequency: '14,54 6-23 * * *', // Runs at minute 14 and 54 every hour from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'immovlan',
    label: 'Immovlan',
    method: scrapeImmovlan,
    enabled: true,
    frequency: '27 6-23 * * *', // Runs at minute 27 every hour from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'latouretpetit',
    label: 'Latour & Petit',
    method: scrapeLatourEtPetit,
    enabled: true,
    frequency: '33 6-23 * * *', // Runs at minute 33 every hour from 06:00 to 23:59
    hasLinkPreview: false,
  },
  {
    name: 'myimmo',
    label: 'My Immo',
    method: scrapeMyimmo,
    enabled: true,
    frequency: '39 6-23 * * *', // Runs at minute 39 every hour from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'realo',
    label: 'Realo',
    method: scrapeRealo,
    enabled: true,
    frequency: '47 6-23 * * *', // Runs at minute 47 every hour from 06:00 to 23:59
    hasLinkPreview: true,
  },
];

export default AGENCIES;
