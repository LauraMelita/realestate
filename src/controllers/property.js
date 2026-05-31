import Property from '#models/property';
import { generateHash } from '#utils/helpers';
import { logError } from '#utils/logger';

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

  if (!newProperties.length) return [];

  // Insert new properties
  try {
    return await Property.insertMany(newProperties, {
      ordered: false,
      throwOnValidationError: true,
    });
  } catch (error) {
    const insertedProperties = error.insertedDocs ?? error.results?.filter((result) => result?.isNew === false) ?? [];
    const insertedHashes = new Set(insertedProperties.map((property) => property.hash));
    const failedProperties = newProperties.filter((property) => !insertedHashes.has(property.hash));

    logError(`[scheduler] [${agency}] Some properties failed to save`, {
      attempted: newProperties.length,
      inserted: insertedProperties.length,
      error: error.message,
      failed: {
        total: failedProperties.length,
        properties: failedProperties.map(({ sourceId, url }) => ({ sourceId, url })),
      },
    });

    return insertedProperties;
  }
};
