import { useQuery } from '@tanstack/react-query'

import productsApi from '@/apis/products.api'
import categoriesData from '@/data/categories.data'
import ms from 'ms'

export default function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: ({ signal }) => productsApi.getCategories(signal),
    staleTime: ms('5m'),
    initialData: categoriesData,
  })
}
