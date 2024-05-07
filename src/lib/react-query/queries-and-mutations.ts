import ms from 'ms'
import { useMutation, useQuery } from '@tanstack/react-query'

import productsApi from '@/apis/products.api'
import { CATEGORIES_DATA } from '@/data/categories.data'
import usersApi from '@/apis/users.api'
import authsApi from '@/apis/auths.api'
import { ProductParameters } from '@/types/product.type'
import { QUERY_KEYS } from '@/constants/query-key'

export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: ({ signal }) => productsApi.getCategories(signal),
    staleTime: ms('5m'),
    initialData: CATEGORIES_DATA,
  })
}

export function useProducts<T>(params?: ProductParameters) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: ({ signal }) => productsApi.getProducts<T>(params, signal),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: ({ signal }) => productsApi.getProduct(id, signal),
  })
}

export function useRegister() {
  return useMutation({ mutationFn: usersApi.register })
}

export function useResendEmail() {
  return useMutation({ mutationFn: usersApi.resendEmail })
}

export function useLogin() {
  return useMutation({ mutationFn: authsApi.login })
}

export function useLoginByCode() {
  return useMutation({ mutationFn: authsApi.loginByCode })
}

export function useGetProfile(enabled: boolean) {
  return useQuery({ queryKey: [QUERY_KEYS.PROFILE], queryFn: ({ signal }) => usersApi.getProfile(signal), enabled })
}
