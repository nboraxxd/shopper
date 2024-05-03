import queryString from 'query-string'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { useLocation } from 'react-router-dom'

import { QueryConfig } from '@/types'
import { ProductSort } from '@/constants/enums'

export default function useQueryParamsFiltered() {
  const { search } = useLocation()
  const queryParams = queryString.parse(search)

  const productSortList = Object.values(ProductSort)

  const queryParamsFiltered: QueryConfig = omitBy(
    {
      sort:
        queryParams.sort === 'string' && productSortList.includes(queryParams.sort as ProductSort)
          ? (queryParams.sort as ProductSort)
          : undefined,
      name: queryParams.name,
      page: Number(queryParams.page) ? queryParams.page : undefined,
      minPrice: Number(queryParams.minPrice) ? queryParams.minPrice : undefined,
      maxPrice: Number(queryParams.maxPrice) ? queryParams.maxPrice : undefined,
      filterRating: Number(queryParams.filterRating) ? queryParams.filterRating : undefined,
    },
    isUndefined
  )

  return queryParamsFiltered
}
