import http from '@/utils/http'
import { CategoriesResponse, ProductParameters, ProductsResponse } from '@/types/product.type'

const PRODUCTS_URL = '/product'

const productsApi = {
  getProducts<T>(params?: ProductParameters, signal?: AbortSignal) {
    return http.get<ProductsResponse<T>>(PRODUCTS_URL, {
      params,
      signal,
    })
  },

  getCategories(signal?: AbortSignal) {
    return http.get<CategoriesResponse>(`${PRODUCTS_URL}/categories`, { signal })
  },
}

export default productsApi
