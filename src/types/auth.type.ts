export type LoginReqBody = {
  username: string
  password: string
}

export type LoginResponse = {
  data: {
    data: {
      accessToken: string
      refreshToken: string
    }
  }
}
