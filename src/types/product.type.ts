import { ProductFilter } from '@/constants/enums'

export type ProductParameters = {
  page?: number
  limit?: number
  sort?: ProductFilter
  search?: string
}
