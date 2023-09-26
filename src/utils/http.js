import axios from 'axios'
import { getTokenFromLS } from './token'

export const http = axios.create()

// Thêm một bộ đón chặn request
http.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
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
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error)
  },
)
