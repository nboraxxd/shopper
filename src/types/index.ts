import { ProductSort } from '@/constants/enums'
import { ProductParameters } from '@/types/product.type'

export type FieldUnion<T extends string> = T extends `${infer U},${infer Rest}` ? U | FieldUnion<Rest> : T

export type ErrorResponse<Data = undefined> = {
  message: string
  error?: string | number
  detail?: Data
}

export type QueryConfig = {
  [key in keyof Omit<ProductParameters, 'fields' | 'limit' | 'sort'>]: string
} & {
  sort?: ProductSort
}

export type Paginate = {
  currentPage: number | null
  totalPage: number
  count: number
  perPage: number
}
