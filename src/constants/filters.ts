import { ProductFilter } from '@/constants/enums'

export const PRODUCT_FILTERS = [
  { name: 'Giá giảm dần', value: ProductFilter.PRICE_DESC },
  { name: 'Giá tăng dần', value: ProductFilter.PRICE_ASC },
  { name: 'Giảm giá nhiều nhất', value: ProductFilter.DISCOUNT_DESC },
  { name: 'Được đánh giá cao', value: ProductFilter.RATING_DESC },
  { name: 'Mua nhiều nhất', value: ProductFilter.TOP_SELLER },
  { name: 'Sản phẩm mới nhất', value: ProductFilter.NEWEST },
]
