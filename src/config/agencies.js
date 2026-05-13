import {
  scrapeCentury,
  scrapeEra,
  scrapeImmoabita,
  scrapeExpertissimmo,
  scrapeImmovlan,
  scrapeImmoweb,
  scrapeLatourEtPetit,
  scrapeMyimmo,
  scrapeOralis,
  scrapeRealo,
} from '#scrapers/index';

const AGENCIES = [
  {
    name: 'century',
    method: scrapeCentury,
    enabled: true,
    frequency: '*/40 6-23 * * *', // Every 40 minutes from 06:00 to 23:59
    hasLinkPreview: false,
  },
  {
    name: 'era',
    method: scrapeEra,
    enabled: true,
    frequency: '*/23 6-23 * * *', // Every 23 minutes from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'expertissimo',
    method: scrapeExpertissimmo,
    enabled: true,
    frequency: '*/25 6-23 * * *', // Every 25 minutes from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'immoabita',
    method: scrapeImmoabita,
    enabled: true,
    frequency: '*/26 6-23 * * *', // Every 26 minutes from 06:00 to 23:59
    hasLinkPreview: false,
  },
  {
    name: 'immovlan',
    method: scrapeImmovlan,
    enabled: true,
    frequency: '*/30 6-23 * * *', // Every 30 minutes from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'immoweb',
    method: scrapeImmoweb,
    enabled: true,
    frequency: '*/20 6-23 * * *', // Every 20 minutes from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'latouretpetit',
    method: scrapeLatourEtPetit,
    enabled: true,
    frequency: '*/23 6-23 * * *', // Every 23 minutes from 06:00 to 23:59
    hasLinkPreview: false,
  },
  {
    name: 'myimmo',
    method: scrapeMyimmo,
    enabled: true,
    frequency: '*/25 6-23 * * *', // Every 25 minutes from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'oralis',
    method: scrapeOralis,
    enabled: true,
    frequency: '*/29 6-23 * * *', // Every 29 minutes from 06:00 to 23:59
    hasLinkPreview: true,
  },
  {
    name: 'realo',
    method: scrapeRealo,
    enabled: true,
    frequency: '*/20 6-23 * * *', // Every 20 minutes from 06:00 to 23:59
    hasLinkPreview: true,
  },
];

export default AGENCIES;
