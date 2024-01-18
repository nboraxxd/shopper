import { http } from '@/utils/http'

const productsApi = {
  getProducts() {
    return http.get('/product?limit=10&fields=name,id,review_count,stock_item')
  },
}

export default productsApi
