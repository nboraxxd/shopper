import { ProductSort } from '@/constants/enums'

export const PRODUCTS_SORT = [
  { name: 'Mới nhất', value: ProductSort.NEWEST },
  { name: 'Bán chạy', value: ProductSort.TOP_SELLER },
  { name: 'Đánh giá tốt', value: ProductSort.RATING_DESC },
  { name: 'Giảm nhiều nhất', value: ProductSort.DISCOUNT_DESC },
  { name: 'Giá giảm dần', value: ProductSort.PRICE_DESC },
  { name: 'Giá tăng dần', value: ProductSort.PRICE_ASC },
] as const
