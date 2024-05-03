import queryString from 'query-string'
import { To } from 'react-router-dom'

import { cn } from '@/utils'
import { PATH } from '@/constants/path'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { LinkButton } from '@/components/shared/button'

interface Props {
  queryParams: queryString.ParsedQuery<string>
  currentPage: number
  totalPage: number
}

const RANGE = 2

export default function Pagination({ queryParams: _queryParams, currentPage, totalPage }: Props) {
  function renderPageNumbers() {
    if (currentPage <= RANGE + 1) {
      return Array.from(Array(RANGE * 2 + 2)).map((_, i) => {
        const pageNumber = i + 1

        if (pageNumber <= RANGE * 2 + 1) {
          return <PaginationBtn key={i} to={PATH.PRODUCTS} pageNumber={pageNumber} currentPage={currentPage} />
        }

        return <PaginationDot key={i} />
      })
    } else if (currentPage > totalPage - RANGE) {
      return Array.from(Array(RANGE * 2 + 3)).map((_, i) => {
        const pageNumber = totalPage - RANGE * 2 - 2 + i
        if (i === 0) return <PaginationBtn key={i} to={PATH.PRODUCTS} pageNumber={1} />

        if (i === 1) return <PaginationDot key={i} />

        if (pageNumber <= totalPage) {
          return <PaginationBtn key={i} to={PATH.PRODUCTS} pageNumber={pageNumber} currentPage={currentPage} />
        }
      })
    } else {
      return Array.from(Array(RANGE * 2 + 4)).map((_, i) => {
        const pageNumber = i + currentPage - RANGE - 2

        if (i === 0) return <PaginationBtn key={i} to={PATH.PRODUCTS} pageNumber={1} />

        if (pageNumber === currentPage - RANGE - 1 && pageNumber > 1) return <PaginationDot key={i} />

        if (pageNumber >= currentPage - RANGE && pageNumber <= currentPage + RANGE && pageNumber <= totalPage) {
          return <PaginationBtn key={i} to={PATH.PRODUCTS} pageNumber={pageNumber} currentPage={currentPage} />
        }

        if (pageNumber <= totalPage && pageNumber === currentPage + RANGE + 1) return <PaginationDot key={i} />

        return null
      })
    }
  }

  return (
    <ul className="mt-8 gap-2 flex-center">
      <LinkButton
        to={PATH.PRODUCTS}
        className="medium-16 text-secondary1_light1 h-9 justify-center rounded px-2 transition-colors flex-center hover:bg-secondary/50"
      >
        <ChevronLeftIcon className="mt-1 size-5 stroke-secondary-1 dark:stroke-light-1" />
      </LinkButton>

      {renderPageNumbers()}

      <LinkButton
        to={PATH.PRODUCTS}
        className="medium-16 text-secondary1_light1 h-9 justify-center rounded-[4px] px-2 transition-colors flex-center hover:bg-secondary/50"
      >
        <ChevronRightIcon className="mt-1 size-5 stroke-secondary-1 dark:stroke-light-1" />
      </LinkButton>
    </ul>
  )
}

function PaginationBtn({ to, pageNumber, currentPage }: { to: To; pageNumber: number; currentPage?: number }) {
  return (
    <LinkButton
      to={to}
      className={cn(
        'medium-16 text-secondary1_light1 h-9 min-w-9 justify-center rounded-[4px] px-3 transition-colors flex-center',
        pageNumber === currentPage ? 'bg-secondary' : 'hover:bg-secondary/50'
      )}
    >
      {pageNumber}
    </LinkButton>
  )
}

function PaginationDot() {
  return (
    <span className="medium-16 text-secondary1_light1 h-9 justify-center rounded-[4px] px-3 transition-colors flex-center">
      ...
    </span>
  )
}
