import http from '@/utils/http'
import { SuccessResponse } from '@/types'
import { LoginReqBody, LoginResponse } from '@/types/auth.type'

const AUTH_URL = '/authentication/v2'
export const LOGIN_API_URL = `${AUTH_URL}/login`
export const LOGIN_BY_CODE_API_URL = `${AUTH_URL}/login-by-code`

const authsApi = {
  login: (body: LoginReqBody) =>
    http.post<SuccessResponse<LoginResponse>, SuccessResponse<LoginResponse>>(LOGIN_API_URL, body),

  loginByCode: (code: string) =>
    http.post<SuccessResponse<LoginResponse>, SuccessResponse<LoginResponse>>(LOGIN_BY_CODE_API_URL, { code }),
}

export default authsApi
