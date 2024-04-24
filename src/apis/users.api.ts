import http from '@/utils/http'
import { RegisterReqBody, RegisterResponse, ResendEmailResponse, UserResponse } from '@/types/user.type'
import { envConfig } from '@/constants/config'

const USERS_URL = '/users'

const usersApi = {
  register: (body: RegisterReqBody) =>
    http.post<RegisterResponse>(`${USERS_URL}/register`, {
      ...body,
      redirect: `${envConfig.clientUrl}/login`,
    }),

  resendEmail: (username: string) =>
    http.post<ResendEmailResponse>(`${USERS_URL}/resend-email`, {
      username,
    }),

  getProfile: (signal?: AbortSignal) => http.get<UserResponse>(`${USERS_URL}`, { signal }),
}

export default usersApi
