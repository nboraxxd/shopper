import { FieldUnion } from '@/types'
import { Product } from '@/types/product.type'

const fields = '_id,id,name,price,real_price,rating_average,review_count,thumbnail_url,slug'

type Fields = FieldUnion<typeof fields>

type Cart = {
  subTotal: number
  totalQuantity: number
  listItems: {
    productId: number
    quantity: number
    product: Pick<Product, Fields>
  }[]
}

export type UpdateQtyCartReqBody = {
  productId: number
  quantity: number
}

export type GetCartResponse = {
  data: Cart
}

export type UpdateQtyCartResponse = {
  updateCount: number
  data: {
    _id: string
    type: string
    user: string
    listItems: {
      productId: number
      quantity: number
    }[]
    totalQuantity: number
    status: string
  }
}

export type DelCartItemResponse = {
  deleteCount: number
}
