import fs from 'fs/promises';
import UserAgent from 'user-agents';
import crypto from 'crypto';

export const buildSearchUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, Array.isArray(value) ? value.join(',') : value);
  });

  return url.toString();
};

export const buildBracketedSearchUrl = (baseUrl, params = {}) => {
  const parts = Object.entries(params).map(([key, value]) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = Array.isArray(value) ? value.join(',') : encodeURIComponent(value);

    const finalKey = encodedKey.replace(/%5B/g, '[').replace(/%5D/g, ']');

    const finalValue = encodedValue
      .replace(/%28/g, '(')
      .replace(/%29/g, ')')
      .replace(/%2C/g, ',')
      .replace(/%3A/g, ':')
      .replace(/%2B/g, '+');

    return `${finalKey}=${finalValue}`;
  });

  return `${baseUrl}?${parts.join('&')}`;
};

export const createUserAgent = () => new UserAgent().random().toString();

export const generateHash = (url) => crypto.createHash('md5').update(url).digest('hex');

export const filterEmpty = (arr) =>
  arr.filter(
    (item) =>
      item !== null &&
      item !== undefined &&
      (typeof item !== 'object' || Object.keys(item).length > 0),
  );

export const deduplicateByKey = (arr, key) =>
  Array.from(new Map(arr.map((item) => [item[key], item])).values());

export const deduplicateByKeys = (arr, keys) =>
  Array.from(
    new Map(
      arr.map((item) => {
        const compositeKey = keys
          .map((key) => key.split('.').reduce((obj, prop) => obj?.[prop], item))
          .join('|');

        return [compositeKey, item];
      }),
    ).values(),
  );

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatPrice = (price) =>
  price ? `€${price.toLocaleString('en-US')}` : 'price on demand';

export const humanDateTime = () => {
  const now = new Date();

  return now
    .toLocaleString('fr-BE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(',', '');
};

export const writeFile = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Failed to write file at ${path}`, error);
  }
};
