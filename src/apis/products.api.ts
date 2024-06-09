import http from '@/utils/http'
import {
  CategoriesResponse,
  CategoryResponse,
  ProductParameters,
  ProductResponse,
  ProductsResponse,
} from '@/types/product.type'

const PRODUCTS_URL = '/product'

const productsApi = {
  getProducts<T>(params?: ProductParameters, signal?: AbortSignal) {
    return http.get<ProductsResponse<T>>(PRODUCTS_URL, {
      params,
      signal,
    })
  },

  getProduct(id: number, signal?: AbortSignal) {
    return http.get<ProductResponse>(`${PRODUCTS_URL}/${id}`, { signal })
  },

  getCategories(signal?: AbortSignal) {
    return http.get<CategoriesResponse>(`${PRODUCTS_URL}/categories`, { signal })
  },

  getCategory(id: string, signal?: AbortSignal) {
    return http.get<CategoryResponse>(`${PRODUCTS_URL}/categories/${id}`, { signal })
  },
}

export default productsApi
