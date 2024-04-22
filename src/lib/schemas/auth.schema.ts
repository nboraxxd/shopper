import { z } from 'zod'
import { AUTH_MESSAGES } from '@/constants/message'

const name = z.string().min(1, AUTH_MESSAGES.NAME_IS_REQUIRED)
const username = z.string().email(AUTH_MESSAGES.EMAIL_INVALID)
const password = z.string().regex(/^.{6,32}$/, AUTH_MESSAGES.PASSWORD_INVALID)

export const registerSchema = z
  .object({
    name,
    username,
    password,
    confirm_password: password,
  })
  .strict()
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
        path: ['confirm_password'],
      })
    }
  })

export const loginSchema = z.object({ username, password }).strict()

export type RegisterSchemaType = z.infer<typeof registerSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>
