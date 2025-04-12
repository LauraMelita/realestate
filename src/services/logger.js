import chalk from 'chalk';

import { humanDateTime } from '#utils/helpers';

export const logScraperStart = (agency) => {
  console.log(
    chalk.green(`[${humanDateTime()}] Running scraper for ${agency}`),
  );
};

export const logSaved = (agency, count = 0) => {
  const label = `[${agency}]`;

  if (!count) {
    console.log(`${label} No new properties found`);
    return;
  }

  console.log(chalk.green(`${label} ${count} new properties saved`));
};

export const logError = (...args) => {
  console.error(chalk.red(args.join(' ')));
};
