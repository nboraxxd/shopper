import http from '@/utils/http'
import { DelCartItemResponse, GetCartResponse, UpdateQtyCartReqBody, UpdateQtyCartResponse } from '@/types/cart.type'

const CART_URL = '/cart/v2'

const cartsApi = {
  getCart(signal?: AbortSignal) {
    return http.get<GetCartResponse>(CART_URL, { signal })
  },

  updateQtyCart({ productId, quantity }: UpdateQtyCartReqBody) {
    return http.patch<UpdateQtyCartResponse>(`${CART_URL}/${productId}`, { quantity })
  },

  delCartItem(productId: number) {
    return http.delete<DelCartItemResponse>(`${CART_URL}/${productId}`)
  },
}

export default cartsApi
