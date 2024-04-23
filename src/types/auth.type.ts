export type LoginReqBody = {
  username: string
  password: string
}

export type LoginResponse = {
  data: {
    accessToken: string
    refreshToken: string
  }
}
