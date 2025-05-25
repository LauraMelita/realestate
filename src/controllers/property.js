import Property from '#models/property';

import { generateHash } from '#utils/helpers';

export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

export const saveNewProperties = async (properties, agency) => {
  if (!properties.length) return [];

  const enriched = properties.map((property) => ({
    hash: generateHash(`${agency}_${property.sourceId}`),
    agency,
    ...property,
  }));

  // Deduplicate based on hash
  const hashes = enriched.map((property) => property.hash);
  const existing = await Property.find({ hash: { $in: hashes } }).select('hash');
  const existingHashes = new Set(existing.map((property) => property.hash));
  const newProperties = enriched.filter((property) => !existingHashes.has(property.hash));

  // Insert new properties
  return newProperties.length ? await Property.insertMany(newProperties) : [];
};
