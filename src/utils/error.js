import createHttpError from 'http-errors';

// ============================================================
// MONGODB ERRORS
// ============================================================

export const handleDBInvalidValue = (error) => {
  const message = `Invalid value '${error.value}' for the field '${error.path}'. Please ensure the value matches the expected type.`;

  return createHttpError(400, message);
};

export const handleDBDuplicateFields = (error) => {
  const fields = Object.keys(error.keyValue);
  const values = Object.values(error.keyValue);

  // If only one field is causing the duplicate error
  if (fields.length === 1) {
    const field = fields[0];
    const value = error.keyValue[field];

    const message = `Duplicate ${field}: '${value}'. Please use a unique ${field}.`;

    return createHttpError(400, message);
  }

  // If multiple fields are causing the duplicate error
  const fieldNames = fields.join(' and ');
  const fieldValues = values.map((value) => `'${value}'`).join(' and ');

  const message = `The combination of ${fieldNames} must be unique. A document with the fields ${fieldValues} already exists.`;

  return createHttpError(400, message);
};

export const handleDBValidationError = (error) => {
  const validationErrors = Object.values(error.errors)
    .map((el) => el.message.replace(/,$/, ''))
    .join('. ');

  const message = `Invalid input data. ${validationErrors}.`;

  return createHttpError(400, message);
};

// ============================================================
// AXIOS ERRORS
// ============================================================

export const handleAxiosError = (error) => {
  if (!error.response) {
    return createHttpError(503, 'Unable to connect to the server.');
  }

  const { status } = error.response;
  const message = error.response.data?.status_message || error.message;

  return createHttpError(status, message);
};
