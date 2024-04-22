import ms from 'ms'
import { useMutation, useQuery } from '@tanstack/react-query'

import productsApi from '@/apis/products.api'
import categoriesData from '@/data/categories.data'
import usersApi from '@/apis/users.api'
import { ProductParameters } from '@/types/product.type'
import { QUERY_KEYS } from '@/constants/query-key'

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

export function useRegister() {
  return useMutation({ mutationFn: usersApi.register })
}

export function useResendEmail() {
  return useMutation({ mutationFn: usersApi.resendEmail })
}
