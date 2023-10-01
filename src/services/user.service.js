import { USER_API } from '@/config/api'
import { http } from '@/utils'

export const userService = {
  register(body) {
    return http.post(`${USER_API}/register`, body)
  },

  getUser() {
    return http.get(USER_API)
  },

  updateProfile(body) {
    return http.patch(USER_API, body)
  },

  changePassword(body) {
    return http.post(`${USER_API}/change-password`, body)
  },
}
