export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  NO_FIELDS_PROVIDED: 'No fields provided for update',
  UPDATE_FAILED: 'Update failed or resource not found',
  INVALID_INPUT: 'Invalid input data',
  UNAUTHORIZED: 'Unauthorized access',
  UNKNOWN_ERROR: 'An unknown error occurred',
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
};
