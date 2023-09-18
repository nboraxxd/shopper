
import productsService from '@/services/products.service'
import useQuery from '@/hooks/useQuery'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productsService.getCategories,
  })
}

export function useCategory(id) {
  const categories = useCategories()

  return categories?.data?.data.find((category) => category.id === id)
}
