import UserAgent from 'user-agents';
import crypto from 'crypto';

export const buildSearchUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, Array.isArray(value) ? value.join(',') : value);
  });

  return url.toString();
};

export const createUserAgent = () => new UserAgent().random().toString();

export const generateHash = (url) =>
  crypto.createHash('md5').update(url).digest('hex');

export const filterEmpty = (arr) =>
  arr.filter(
    (item) =>
      item !== null &&
      item !== undefined &&
      (typeof item !== 'object' || Object.keys(item).length > 0),
  );

export const deduplicateByKey = (arr, key) =>
  Array.from(new Map(arr.map((item) => [item[key], item])).values());
