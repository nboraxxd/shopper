import { PRODUCT_API } from '@/config/api'
import { http } from '@/utils'

const productsService = {
  getProducts(query = '', signal) {
    return http.get(PRODUCT_API + query, { signal })
  },
}

export default productsService
