import { HttpStatusCode } from 'axios'

import { ProductFilter } from '@/constants/enums'

type Badge =
  | {
      code: 'tikinow' | 'only_ship_to'
      text: string
    }
  | {
      code: 'installment'
      price: number
      month: number
    }
  | {
      code: 'cross_border'
    }

type ConfigurableOption = {
  code: string
  name: string
  position: number
  values: {
    label: string
  }[]
}

type ConfigurableProduct = {
  images: {
    large_url: string
    medium_url: string
    small_url: string
  }[]
}

type Image = {
  base_url: string
  thumbnail_url: string
  small_url: string
  medium_url: string
  large_url: string
  is_gallery: boolean
}

type Specification = {
  name: string
  attributes: {
    name: string
    value: string
  }[]
}

export type ProductParameters = {
  sort?: ProductFilter
  name?: string
  fields?: string
  categories?: number
  minPrice?: number
  maxPrice?: number
  limit?: number
  page?: number
}

export type Paginate = {
  currentPage: number
  totalPage: number
  count: number
  perPage: number
}

export type Product = {
  _id: string
  id: number
  sku: string
  badges: Badge[]
  categories: number
  configurable_options: ConfigurableOption[]
  configurable_products: ConfigurableProduct[] // You may replace `any` with a specific type if you know the structure of `configurable_products`
  description: string
  discount: number
  discount_rate: number
  images: Image[]
  inventory_status: 'discontinued' | 'pre_order' | 'available'
  name: string
  price: number
  real_price: number
  price_usd: number
  rating_average: number
  review_count: number
  short_description: string
  specifications: Specification[]
  stock_item: {
    qty: number
    min_sale_qty: number
    max_sale_qty: number
    preorder_date: boolean
  }
  thumbnail_url: string
  top_features: string[]
  type: 'configurable' | 'simple'
  slug: string
}

export type ProductsResponse<P> = {
  data: {
    data: P[]
    paginate: Paginate
  }
}

export type Category = {
  _id: string
  id: number
  parent_id: number
  position: number
  status: number
  title: string
  slug: string
  parent: null
}

export type CategoriesResponse = {
  data: {
    data: Category[]
  }
  status: HttpStatusCode
}
