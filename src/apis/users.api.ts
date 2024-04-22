import { RegisterReqBody, RegisterResponse, ResendEmailResponse } from '@/types/user.type'
import { envConfig } from '@/constants/config'
import { http } from '@/utils/http'

const USERS_URL = '/users'

const usersApi = {
  register: (body: RegisterReqBody) =>
    http.post<RegisterResponse, RegisterResponse>(`${USERS_URL}/register`, {
      ...body,
      redirect: `${envConfig.clientUrl}/login`,
    }),

  resendEmail: (username: string) =>
    http.post<ResendEmailResponse, ResendEmailResponse>(`${USERS_URL}/resend-email`, { username }),
}

export default usersApi
