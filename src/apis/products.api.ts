import http from '@/utils/http'
import { SuccessResponse } from '@/types'
import { CategoriesResponse, ProductParameters, ProductsResponse } from '@/types/product.type'

const PRODUCTS_URL = '/product'

const productsApi = {
  getProducts<T>(params?: ProductParameters, signal?: AbortSignal) {
    return http.get<SuccessResponse<ProductsResponse<T>>, SuccessResponse<ProductsResponse<T>>>(PRODUCTS_URL, {
      params,
      signal,
    })
  },

  getCategories(signal?: AbortSignal) {
    return http.get<SuccessResponse<CategoriesResponse>, SuccessResponse<CategoriesResponse>>(
      `${PRODUCTS_URL}/categories`,
      { signal }
    )
  },
}

export default productsApi
