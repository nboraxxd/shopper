import ms from 'ms'
import { toast } from 'sonner'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'

import { ErrorResponse } from '@/types'
import { AuthResponse } from '@/types/auth.type'
import { envConfig } from '@/constants/config'
import { AUTH_API_URL, LOGIN_API_URL, LOGIN_BY_CODE_API_URL, REFRESH_TOKEN_API_URL } from '@/apis/auths.api'
import { isAxiosExpiredTokenError, isAxiosForbiddenError } from '@/utils/error'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeAuthFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from '@/utils/local-storage'

let accessToken: string | null = getAccessTokenFromLocalStorage()
let refreshToken: string | null = getRefreshTokenFromLocalStorage()
let refreshTokenRequest: Promise<string> | null

export function removeTokensFromHttp() {
  accessToken = null
  refreshToken = null
}

const http: AxiosInstance = axios.create({
  baseURL: envConfig.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

async function handleRefreshToken() {
  try {
    const response = await http.post<AuthResponse>(`${AUTH_API_URL}/refresh-token`, { refreshToken })

    const { accessToken: newAccessToken } = response.data.data

    setAccessTokenToLocalStorage(newAccessToken)
    accessToken = newAccessToken

    return newAccessToken
  } catch (error) {
    removeAuthFromLocalStorage()
    removeTokensFromHttp()
    throw error
  }
}

http.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    const { url } = response.config

    if (url === LOGIN_API_URL || url === LOGIN_BY_CODE_API_URL) {
      const responseData = response.data as AuthResponse
      accessToken = responseData.data.accessToken
      refreshToken = responseData.data.refreshToken

      setAccessTokenToLocalStorage(accessToken)
      setRefreshTokenToLocalStorage(refreshToken)
    }

    return response
  },
  async (error: AxiosError) => {
    const excludedStatusCodes = [HttpStatusCode.Forbidden, HttpStatusCode.BadRequest]

    if (error.response?.status && !excludedStatusCodes.includes(error.response.status)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any | undefined = error.response.data
      const message = data.message || error.message
      toast.error(message)
    }

    if (isAxiosForbiddenError<{ error: ErrorResponse }>(error)) {
      const config = error.response?.config
      const url = config?.url

      if (isAxiosExpiredTokenError(error) && url !== REFRESH_TOKEN_API_URL) {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : handleRefreshToken().finally(() => {
              // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có lỗi 403 thì dùng
              setTimeout(() => {
                refreshTokenRequest = null
              }, ms('10s'))
            })

        const accessToken = await refreshTokenRequest
        if (config?.headers) {
          config.headers.Authorization = accessToken
        }

        return http.request({ ...config, headers: { ...config?.headers, Authorization: accessToken } })
      }

      removeAuthFromLocalStorage()
      removeTokensFromHttp()
      toast.error(error.response?.data.error.message || error.message)
    }

    return Promise.reject(error)
  }
)

export default http
