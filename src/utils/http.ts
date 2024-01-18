import { envConfig } from '@/constants/config'
import axios, { AxiosInstance } from 'axios'

export const http: AxiosInstance = axios.create({
  baseURL: envConfig.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
