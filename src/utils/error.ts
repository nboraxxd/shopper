import { ErrorResponse } from '@/types'
import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosForbiddenError<ForbiddenError>(error: unknown): error is AxiosError<ForbiddenError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Forbidden
}

export function isAxiosExpiredTokenError<ForbiddenError>(error: unknown): error is AxiosError<ForbiddenError> {
  return isAxiosForbiddenError<ErrorResponse>(error) && error.response?.data.error_code === 'TOKEN_EXPIRED'
}
