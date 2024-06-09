import { Paginate } from '@/types'

type Review = {
  _id: string
  orderId: string
  productId: number
  senderId: string
  createdAt: number
  content: string
  star: number
  user: {
    _id: string
    name: string
    avatar: null | string
  }
}

export type ReviewsResponse = {
  data: Review[]
  paginate: Paginate
}

export type ReviewsReqBody = {
  productId: number
  limit?: string
  page?: string
  signal?: AbortSignal
}
