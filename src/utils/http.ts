import { toast } from 'sonner'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'

import { envConfig } from '@/constants/config'

const http: AxiosInstance = axios.create({
  baseURL: envConfig.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
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
