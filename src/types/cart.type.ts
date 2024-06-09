import { FieldUnion } from '@/types'
import { Product } from '@/types/product.type'
import { ShippingMethod } from '@/constants/enums'

const fields = '_id,id,name,price,real_price,rating_average,review_count,thumbnail_url,slug'

type Fields = FieldUnion<typeof fields>

type Cart = {
  subTotal: number
  totalQuantity: number
  listItems: ItemInCart[]
}

type Shipping = {
  shippingMethod: ShippingMethod
  shippingPrice: number
}

type Promotion = {
  code: string
  discount: number
  description: string
  title: string
}

export type ItemInCart = {
  productId: number
  quantity: number
  product: Pick<Product, Fields>
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

export type PreCheckOutReqBody = {
  listItems: Array<number>
  shippingMethod?: ShippingMethod
  promotionCode?: [string]
}

export type PreCheckOutResponse = {
  data: {
    total: number // tổng giá trị đơn hàng sau trừ khuyến mãi và cộng thuế
    subTotal: number // tổng giá trị sản phẩm
    tax: number
    promotion: Promotion | null
    shipping: Shipping | null
    totalQuantity: number
    viewCartTotal: number
    listItems: ItemInCart & { price: number }[]
  }
}
