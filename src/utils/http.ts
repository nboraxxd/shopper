import { toast } from 'sonner'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'

import { LoginResponse } from '@/types/auth.type'
import { envConfig } from '@/constants/config'
import { LOGIN_API_URL, LOGIN_BY_CODE_API_URL } from '@/apis/auths.api'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from '@/utils/localStorage'

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
      accessToken = (response.data as LoginResponse).data.accessToken
      refreshToken = (response.data as LoginResponse).data.refreshToken

      setAccessTokenToLocalStorage(accessToken)
    }

    return response
  },
  (error) => {
    if (error instanceof AxiosError) {
      const excludedStatusCodes = [HttpStatusCode.Forbidden, HttpStatusCode.BadRequest]

      if (error.response?.status && !excludedStatusCodes.includes(error.response.status)) {
        const message = error.response?.data.message || error.message
        toast.error(message)
      }
    }
    return Promise.reject(error)
  }
)

export default http
