const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const EMAIL_TO_RESET_PASSWORD_KEY = 'emailToResetPassword'

export function setTokenToLS(data) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
}
export function getTokenFromLS() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}
export function clearTokenFromLS() {
  localStorage.removeItem(TOKEN_KEY)
}

export function setProfileToLS(data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export function getProfileFromLS() {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

export function clearProfileFromLS() {
  localStorage.removeItem(USER_KEY)
}

export function setEmailToResetPasswordToLS(email) {
  localStorage.setItem(EMAIL_TO_RESET_PASSWORD_KEY, JSON.stringify(email))
}

export function getEmailToResetPasswordFromLS() {
  return JSON.parse(localStorage.getItem(EMAIL_TO_RESET_PASSWORD_KEY))
}

export function clearEmailToResetPasswordFromLS() {
  localStorage.removeItem(EMAIL_TO_RESET_PASSWORD_KEY)
}
