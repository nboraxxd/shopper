import http from '@/utils/http'
import { SuccessResponse } from '@/types'
import { RegisterReqBody, RegisterResponse, ResendEmailResponse, UserResponse } from '@/types/user.type'
import { envConfig } from '@/constants/config'

const USERS_URL = '/users'

const usersApi = {
  register: (body: RegisterReqBody) =>
    http.post<SuccessResponse<RegisterResponse>, SuccessResponse<RegisterResponse>>(`${USERS_URL}/register`, {
      ...body,
      redirect: `${envConfig.clientUrl}/login`,
    }),

  resendEmail: (username: string) =>
    http.post<SuccessResponse<ResendEmailResponse>, SuccessResponse<ResendEmailResponse>>(`${USERS_URL}/resend-email`, {
      username,
    }),

  getProfile: (signal?: AbortSignal) =>
    http.get<SuccessResponse<UserResponse>, SuccessResponse<UserResponse>>(`${USERS_URL}`, { signal }),
}

export default usersApi
