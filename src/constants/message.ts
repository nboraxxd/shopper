export const VALIDATION_MESSAGES = {
  ERROR: 'Validation error',
} as const

export const AUTH_MESSAGES = {
  NAME_IS_REQUIRED: 'Name is required',
  EMAIL_INVALID: 'Email is invalid',
  PASSWORD_INVALID: 'Password must be between 6 and 32 characters',
  PASSWORD_NOT_MATCH: 'Password does not match',
} as const
