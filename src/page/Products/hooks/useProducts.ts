import { useQuery } from '@tanstack/react-query'

import productsApi from '@/apis/products.api'
import { ProductParameters } from '@/types/product.type'
import { QUERY_KEYS } from '@/lib/react-query/constants'

export default function useProducts<T>(params?: ProductParameters) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: ({ signal }) => productsApi.getProducts<T>(params, signal),
  })
}
