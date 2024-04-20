import ms from 'ms'
import { useQuery } from '@tanstack/react-query'

import productsApi from '@/apis/products.api'
import categoriesData from '@/data/categories.data'
import { QUERY_KEYS } from '@/constants/query-key'
import { ProductParameters } from '@/types/product.type'

export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: ({ signal }) => productsApi.getCategories(signal),
    staleTime: ms('5m'),
    initialData: categoriesData,
  })
}

export function useProducts<T>(params?: ProductParameters) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: ({ signal }) => productsApi.getProducts<T>(params, signal),
  })
}
