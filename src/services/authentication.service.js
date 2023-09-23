import { http } from '@/utils'
import { AUTHENTICATION_API } from '@/config/api'

export const authenticationService = {
  login(body) {
    return http.post(`${AUTHENTICATION_API}/login-by-code`, body)
  },
}
