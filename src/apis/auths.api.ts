import http from '@/utils/http'
import { LoginReqBody, AuthResponse } from '@/types/auth.type'

export const AUTH_API_URL = '/authentication/v2'
export const LOGIN_API_URL = `${AUTH_API_URL}/login-test`
export const LOGIN_BY_CODE_API_URL = `${AUTH_API_URL}/login-by-code`
export const REFRESH_TOKEN_API_URL = `${AUTH_API_URL}/refresh-token`

const authsApi = {
  login: (body: LoginReqBody) => http.post<AuthResponse>(LOGIN_API_URL, body),

  loginByCode: (code: string) => http.post<AuthResponse>(LOGIN_BY_CODE_API_URL, { code }),
}

export default authsApi
