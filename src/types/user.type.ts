export type RegisterReqBody = {
  name: string
  username: string
  password: string
}

export type RegisterResponse = {
  data: {
    success: boolean
    message: string
  }
}

export type ResendEmailResponse = {
  data: {
    message: string
  }
}
