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
    confirmPassword: password,
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
        path: ['confirmPassword'],
      })
    }
  })

export const loginSchema = z.object({ username, password }).strict()

export const filterSchema = z.object({
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>
export type FilterSchemaType = z.infer<typeof filterSchema>
