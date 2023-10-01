import axios from 'axios'
import { clearTokenFromLS, clearUserFromLS, getTokenFromLS, setTokenToLS } from './token'
import { authenticationService } from '@/services/authentication.service'

export const http = axios.create()

// Thêm một bộ đón chặn request
http.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request được gửi đi
    const token = getTokenFromLS()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.accessToken}`
    }

    return config
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error)
  },
)

// Thêm một bộ đón chặn response
http.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data
  },
  async function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với lỗi response
    if (error.response.status === 403 && error.response.data.error_code === 'TOKEN_EXPIRED') {
      try {
        const token = getTokenFromLS()
        const response = await authenticationService.refreshToken({ refreshToken: token.refreshToken })
        if (response?.data) {
          setTokenToLS(response.data)
          return http(error.config)
        }
      } catch (error) {
        clearUserFromLS()
        clearTokenFromLS()
        throw error
      }
    }
    return Promise.reject(error)
  },
)
