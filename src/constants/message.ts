export const VALIDATION_MESSAGES = {
  ERROR: 'VALIDATE:1',
} as const

export const AUTH_MESSAGES = {
  NAME_IS_REQUIRED: 'Name is required',
  EMAIL_INVALID: 'Email is invalid',
  PASSWORD_INVALID: 'Password must be between 6 and 32 characters',
  PASSWORD_NOT_MATCH: 'Password does not match',
} as const

export const PRICE_FILTER_MESSAGES = {
  PRICE_MUST_BE_POSITIVE_NUMBER: 'Price must be a positive number',
  MAX_PRICE_GT_MIN_PRICE: 'Max price must be greater than min price',
} as const
