import { PRICE_FILTER_MESSAGES } from '@/constants/message'
import { z } from 'zod'

export const filterSchema = z
  .object({
    minPrice: z
      .string()
      .optional()
      .refine((val) => Number(val) >= 0, {
        message: PRICE_FILTER_MESSAGES.PRICE_MUST_BE_POSITIVE_NUMBER,
      }),
    maxPrice: z
      .string()
      .optional()
      .refine((val) => Number(val) >= 0, {
        message: PRICE_FILTER_MESSAGES.PRICE_MUST_BE_POSITIVE_NUMBER,
      }),
  })
  .superRefine((val, ctx) => {
    if (val.minPrice && val.maxPrice && Number(val.minPrice) > Number(val.maxPrice)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: PRICE_FILTER_MESSAGES.MAX_PRICE_GT_MIN_PRICE,
        path: ['maxPrice'],
      })
    }
  })

export type FilterSchemaType = z.infer<typeof filterSchema>
