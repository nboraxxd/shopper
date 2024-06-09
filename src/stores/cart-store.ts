import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { PreCheckOutReqBody, PreCheckOutResponse } from '@/types/cart.type'

type CartState = {
  selectedProductIds: PreCheckOutReqBody['listItems']
  setSelectedProductIds: (preCheckoutBody: PreCheckOutReqBody['listItems']) => void
  preCheckoutResponse: PreCheckOutResponse['data'] | undefined
  setPreCheckoutResponse: (preCheckoutResponse: PreCheckOutResponse['data'] | undefined) => void
}

export const useCartStore = create<CartState>()(
  devtools(
    (set) => ({
      selectedProductIds: [],
      setSelectedProductIds: (selectedProductIds) => set({ selectedProductIds }),
      preCheckoutResponse: undefined,
      setPreCheckoutResponse: (preCheckoutResponse) => set({ preCheckoutResponse }),
    }),
    { enabled: process.env.NODE_ENV === 'development', name: 'cart' }
  )
)
