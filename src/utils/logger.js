import chalk from 'chalk';

const format = (message, color) => {
  const match = message.match(/^((?:\[[^\]]+\]\s*)+)(.*)$/);

  if (!match) return color(message);

  const [, prefix, text] = match;

  return `${chalk.white(prefix)}${color(text)}`;
};

export const logInfo = (message) => console.log(message);

export const logSuccess = (message) => console.log(format(message, chalk.green));

export const logWarning = (message) => console.log(format(message, chalk.yellow));

export const logError = (message, details = null) => {
  console.error(format(message, chalk.red));

  if (details) {
    console.error(chalk.red(JSON.stringify(details, null, 2)));
  }
};
