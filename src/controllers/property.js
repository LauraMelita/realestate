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

  return newProperties.length ? await Property.insertMany(newProperties) : [];
};
