import { User } from '@/types/user.type'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const USER = 'user'

export const setAccessTokenToLS = (accessToken: string) => localStorage.setItem(ACCESS_TOKEN, accessToken)

export const getAccessTokenFromLS = () => localStorage.getItem(ACCESS_TOKEN)

export const setRefreshTokenToLS = (refreshToken: string) => localStorage.setItem(REFRESH_TOKEN, refreshToken)

export const getRefreshTokenFromLS = () => localStorage.getItem(REFRESH_TOKEN)

export const setUserToLS = (user: User) => localStorage.setItem(USER, JSON.stringify(user))

export const getUserFromLS = () => {
  const result = localStorage.getItem(USER)

  return result ? (JSON.parse(result) as User) : null
}

export const clearLS = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(USER)
}
