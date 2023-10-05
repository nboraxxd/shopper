import { http } from '@/utils'
import { AUTHENTICATION_API } from '@/config/api'

export const authenticationService = {
  loginByCode(body) {
    return http.post(`${AUTHENTICATION_API}/login-by-code`, body)
  },

  login(body) {
    return http.post(`${AUTHENTICATION_API}/login`, body)
  },

  refreshToken(body) {
    return http.post(`${AUTHENTICATION_API}/refresh-token`, body)
  },
}
