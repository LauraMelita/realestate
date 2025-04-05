import Apartment from '#models/apartment';

export const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find();

    res.status(200).json({
      status: 'success',
      results: apartments.length,
      data: apartments,
    });
  } catch (error) {
    next(error);
  }
};

export const saveNewApartments = async (apartments) => {
  if (!apartments.length) return [];

  // Get all hashes
  const hashes = apartments.map((apt) => apt.hash);

  // Find existing hashes in DB
  const existing = await Apartment.find({ hash: { $in: hashes } }).select(
    'hash',
  );

  const existingHashes = new Set(existing.map((apt) => apt.hash));

  // Filter only new apartments
  const newApartments = apartments.filter(
    (apt) => !existingHashes.has(apt.hash),
  );

  if (!newApartments.length) {
    console.log('No new apartments found.');
    return [];
  }

  // Insert new apartments
  try {
    await Apartment.insertMany(newApartments);
    console.log(`${newApartments.length} new apartments saved.`);
    return newApartments;
  } catch (error) {
    console.error('Error saving new apartments:', error.message);
    return [];
  }
};
