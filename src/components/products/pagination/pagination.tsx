import queryString from 'query-string'
import { To } from 'react-router-dom'

import { QueryConfig } from '@/types'
import { PATH } from '@/constants/path'
import { PaginationButton } from '@/components/shared/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { PaginationDot } from '@/components/products/pagination'

interface Props {
  queryParams: QueryConfig
  totalPage: number
}

const RANGE = 2

export default function Pagination({ queryParams, totalPage }: Props) {
  const currentPage = Number(queryParams.page) || 1

  function createUrl(page: number): To {
    return {
      pathname: PATH.PRODUCTS,
      search: queryString.stringify({ ...queryParams, page: page.toString() }),
    }
  }

  function renderPageNumbers() {
    if (currentPage <= RANGE + 1) {
      return Array.from(Array(RANGE * 2 + 2)).map((_, i) => {
        const pageNumber = i + 1

        if (pageNumber <= RANGE * 2 + 1) {
          return <PaginationButton key={i} to={createUrl(pageNumber)} currentPage={currentPage} children={pageNumber} />
        }

        return <PaginationDot key={i} />
      })
    } else if (currentPage > totalPage - RANGE) {
      return Array.from(Array(RANGE * 2 + 3)).map((_, i) => {
        const pageNumber = totalPage - RANGE * 2 - 2 + i
        if (i === 0) return <PaginationButton key={i} to={createUrl(1)} children={1} />

        if (i === 1) return <PaginationDot key={i} />

        if (pageNumber <= totalPage) {
          return <PaginationButton key={i} to={createUrl(pageNumber)} currentPage={currentPage} children={pageNumber} />
        }
      })
    } else {
      return Array.from(Array(RANGE * 2 + 4)).map((_, i) => {
        const pageNumber = i + currentPage - RANGE - 2

        if (i === 0) return <PaginationButton key={i} to={createUrl(1)} children={1} />

        if (pageNumber === currentPage - RANGE - 1 && pageNumber > 1) return <PaginationDot key={i} />

        if (pageNumber >= currentPage - RANGE && pageNumber <= currentPage + RANGE && pageNumber <= totalPage) {
          return <PaginationButton key={i} to={createUrl(pageNumber)} currentPage={currentPage} children={pageNumber} />
        }

        if (pageNumber <= totalPage && pageNumber === currentPage + RANGE + 1) return <PaginationDot key={i} />

        return null
      })
    }
  }

  return (
    <ul className="mt-8 justify-center gap-3 flex-center">
      <PaginationButton to={currentPage === 1 ? createUrl(1) : createUrl(currentPage - 1)} className="px-2">
        <ChevronLeftIcon className="mt-0.5 size-5 stroke-secondary-1 dark:stroke-light-1" />
      </PaginationButton>

      {renderPageNumbers()}

      <PaginationButton
        to={currentPage === totalPage ? createUrl(totalPage) : createUrl(currentPage + 1)}
        className="px-2"
      >
        <ChevronRightIcon className="mt-0.5 size-5 stroke-secondary-1 dark:stroke-light-1" />
      </PaginationButton>
    </ul>
  )
}
