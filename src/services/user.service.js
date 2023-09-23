import { USER_API } from '@/config/api'
import { http } from '@/utils'

export const userService = {
  register(body) {
    return http.post(`${USER_API}/register`, body)
  },
}
