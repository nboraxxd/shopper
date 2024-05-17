import ms from 'ms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import productsApi from '@/apis/products.api'
import usersApi from '@/apis/users.api'
import authsApi from '@/apis/auths.api'
import reviewsApi from '@/apis/review.api'
import { CATEGORIES_DATA } from '@/data/categories.data'
import { ProductParameters } from '@/types/product.type'
import { ReviewsReqBody } from '@/types/review.type'
import { QUERY_KEYS } from '@/constants/query-key'

export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: ({ signal }) => productsApi.getCategories(signal),
    staleTime: ms('5m'),
    initialData: CATEGORIES_DATA,
  })
}

export function useCategory(id: string, enabled: boolean) {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORY, id],
    queryFn: ({ signal }) => productsApi.getCategory(id, signal),
    enabled,
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

export function useReviews(productId: string, params: Pick<ReviewsReqBody, 'limit' | 'page'>, enabled: boolean) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: [QUERY_KEYS.REVIEWS, productId, params],
    queryFn: ({ signal }) => reviewsApi.getReviews({ productId, ...params, signal }),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEYS.REVIEWS, productId])
    },
    enabled,
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
