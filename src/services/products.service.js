import { PRODUCT_API } from '@/config/api'
import { http } from '@/utils'

const productsService = {
  getProducts(query = '') {
    return http.get(PRODUCT_API + query)
  },
}

export default productsService
