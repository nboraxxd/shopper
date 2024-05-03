import queryString from 'query-string'
import { To } from 'react-router-dom'

import { QueryConfig } from '@/types'
import { PATH } from '@/constants/path'
import useMediaQuery from '@/hooks/useMediaQuery'
import { PaginationButton } from '@/components/shared/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { PaginationDot } from '@/components/products/pagination'

interface Props {
  queryParams: QueryConfig
  totalPage: number
}

const DESKTOP_RANGE = 2
const MOBILE_RANGE = 1

export default function Pagination({ queryParams, totalPage }: Props) {
  const currentPage = Number(queryParams.page) || 1

  const isMediumDevice = useMediaQuery({ minWidth: 768 })

  const range = isMediumDevice ? DESKTOP_RANGE : MOBILE_RANGE

  function createUrl(page: number): To {
    return {
      pathname: PATH.PRODUCTS,
      search: queryString.stringify({ ...queryParams, page: page.toString() }),
    }
  }

  function renderPageNumbers() {
    if (currentPage <= range + 1) {
      return Array.from(Array(range * 2 + 2)).map((_, i) => {
        const pageNumber = i + 1

        if (pageNumber <= range * 2 + 1) {
          return <PaginationButton key={i} to={createUrl(pageNumber)} currentPage={currentPage} children={pageNumber} />
        }

        return <PaginationDot key={i} />
      })
    } else if (currentPage > totalPage - range) {
      return Array.from(Array(range * 2 + 3)).map((_, i) => {
        const pageNumber = totalPage - range * 2 - 2 + i
        if (i === 0) return <PaginationButton key={i} to={createUrl(1)} children={1} />

        if (i === 1) return <PaginationDot key={i} />

        if (pageNumber <= totalPage) {
          return <PaginationButton key={i} to={createUrl(pageNumber)} currentPage={currentPage} children={pageNumber} />
        }
      })
    } else {
      return Array.from(Array(range * 2 + 4)).map((_, i) => {
        const pageNumber = i + currentPage - range - 2

        if (i === 0) return <PaginationButton key={i} to={createUrl(1)} children={1} />

        if (pageNumber === currentPage - range - 1 && pageNumber > 1) return <PaginationDot key={i} />

        if (pageNumber >= currentPage - range && pageNumber <= currentPage + range && pageNumber <= totalPage) {
          return <PaginationButton key={i} to={createUrl(pageNumber)} currentPage={currentPage} children={pageNumber} />
        }

        if (pageNumber <= totalPage && pageNumber === currentPage + range + 1) return <PaginationDot key={i} />

        return null
      })
    }
  }

  return (
    <ul className="mt-8 justify-center gap-1.5 flex-center md:gap-3">
      <PaginationButton to={currentPage === 1 ? createUrl(1) : createUrl(currentPage - 1)} className="px-1.5 md:px-2">
        <ChevronLeftIcon className="mt-0.5 size-4 stroke-secondary-1 dark:stroke-light-1 md:size-5" />
      </PaginationButton>

      {renderPageNumbers()}

      <PaginationButton
        to={currentPage === totalPage ? createUrl(totalPage) : createUrl(currentPage + 1)}
        className="px-1.5 md:px-2"
      >
        <ChevronRightIcon className="mt-0.5 size-4 stroke-secondary-1 dark:stroke-light-1 md:size-5" />
      </PaginationButton>
    </ul>
  )
}
