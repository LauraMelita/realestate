import Property from '#models/property';
import { logSaved, logError } from '#services/logger';

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

  // Get all hashes
  const hashes = properties.map((prop) => prop.hash);

  // Find existing hashes in DB
  const existing = await Property.find({ hash: { $in: hashes } }).select(
    'hash',
  );

  const existingHashes = new Set(existing.map((prop) => prop.hash));

  // Filter only new properties
  const newProperties = properties.filter(
    (prop) => !existingHashes.has(prop.hash),
  );

  if (!newProperties.length) {
    logSaved(agency);
    return [];
  }

  // Insert new properties
  try {
    await Property.insertMany(newProperties);
    logSaved(agency, newProperties.length);
    return newProperties;
  } catch (error) {
    logError('Error saving new properties:', error.message);
    return [];
  }
};
