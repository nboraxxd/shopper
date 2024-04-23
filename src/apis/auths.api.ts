import http from '@/utils/http'
import { LoginReqBody, LoginResponse } from '@/types/auth.type'

const AUTH_URL = '/authentication/v2'

const authsApi = {
  login: (body: LoginReqBody) => http.post<LoginResponse, LoginResponse>(`${AUTH_URL}/login`, body),

  loginByCode: (code: string) => http.post<LoginResponse, LoginResponse>(`${AUTH_URL}/login-by-code`, { code }),
}

export default authsApi
