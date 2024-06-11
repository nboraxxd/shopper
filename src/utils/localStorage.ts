import { User } from '@/types/user.type'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const USER = 'user'
export const REMOVE_AUTH_LOCAL_STORAGE_EVENT = 'removeAuthFromLocalStorage'

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLocalStorage = (accessToken: string) => localStorage.setItem(ACCESS_TOKEN, accessToken)

export const getAccessTokenFromLocalStorage = () => localStorage.getItem(ACCESS_TOKEN)

export const setRefreshTokenToLocalStorage = (refreshToken: string) => localStorage.setItem(REFRESH_TOKEN, refreshToken)

export const getRefreshTokenFromLocalStorage = () => localStorage.getItem(REFRESH_TOKEN)

export const setUserToLocalStorage = (user: User) => localStorage.setItem(USER, JSON.stringify(user))

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem(USER)

  return result ? (JSON.parse(result) as User) : null
}

export const removeAuthFromLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(USER)
  localStorageEventTarget.dispatchEvent(new Event(REMOVE_AUTH_LOCAL_STORAGE_EVENT))
}
