import { PRODUCT_API } from '@/config/api'
import { http } from '@/utils'

const productsService = {
  /**
   * Có 2 cách để truyền params khi gọi API get Products
   *
   *  Cách 1: Truyền thẳng vào URL API. Với params có dạng là ?page=5&limit=30&fields=name,real_price,price,categories,slug,id
   *    getProducts(params = '', signal) {
   *      return http.get(`${PRODUCT_API}${params}`, { signal })
   *    },
   *
   *  Cách 2: Truyền vào trong parameter thứ 2 khi gọi API. Khi này params là object { page: 5, limit: 30, fields: 'name,real_price,price,categories,slug,id' }
   *    getProducts(params = {}, signal) {
   *      return http.get(PRODUCT_API, { params, signal })
   *    },
   *
   * Ở đây mình dùng cách 2 để gọi API get Products
   */
  getProducts(params = {}, signal) {
    return http.get(PRODUCT_API, { params, signal })
  },

  getCategories() {
    return http.get(`${PRODUCT_API}/categories`)
  },
}

export default productsService
