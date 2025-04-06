import Property from '#models/property';

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

export const saveNewProperties = async (properties) => {
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
    console.log('No new properties found.');
    return [];
  }

  // Insert new properties
  try {
    await Property.insertMany(newProperties);
    console.log(`${newProperties.length} new properties saved.`);
    return newProperties;
  } catch (error) {
    console.error('Error saving new properties:', error.message);
    return [];
  }
};
