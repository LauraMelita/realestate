import { scrapeImmoweb } from '#scrapers/index';

const AGENCIES = [
  {
    name: 'immoweb',
    method: scrapeImmoweb,
    frequency: '*/20 6-23 * * *', // Every 20 minutes from 06:00 to 23:59
  },
  // {
  //   name: 'bytheway',
  //   method: null,
  //   frequency: '*/20 6-23 * * *', // Every 20 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'century',
  //   method: null,
  //   frequency: '*/40 6-23 * * *', // Every 40 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'era',
  //   method: null,
  //   frequency: '*/23 6-23 * * *', // Every 23 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'expertissimo',
  //   method: null,
  //   frequency: '*/25 6-23 * * *', // Every 25 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'immoabita',
  //   method: null,
  //   frequency: '*/26 6-23 * * *', // Every 26 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'immovlan',
  //   method: null,
  //   frequency: '*/30 6-23 * * *', // Every 30 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'latouretpetit',
  //   method: null,
  //   frequency: '*/23 6-23 * * *', // Every 23 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'lecobel',
  //   method: null,
  //   frequency: '*/22 6-23 * * *', // Every 22 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'myimmo',
  //   method: null,
  //   frequency: '*/25 6-23 * * *', // Every 25 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'oralis',
  //   method: null,
  //   frequency: '*/29 6-23 * * *', // Every 29 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'realo',
  //   method: null,
  //   frequency: '*/20 6-23 * * *', // Every 20 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'revimmo',
  //   method: null,
  //   frequency: '*/28 6-23 * * *', // Every 28 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'trior',
  //   method: null,
  //   frequency: '*/29 6-23 * * *', // Every 29 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'viabilis',
  //   method: null,
  //   frequency: '*/22 6-23 * * *', // Every 22 minutes from 06:00 to 23:59
  // },
  // {
  //   name: 'weinvest',
  //   method: null,
  //   frequency: '*/24 6-23 * * *', // Every 24 minutes from 06:00 to 23:59
  // },
];

export default AGENCIES;
