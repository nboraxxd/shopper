import queryString from 'query-string'

import { PATH } from '@/constants/path'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { LinkButton } from '@/components/shared/button'
import { cn } from '@/utils'

interface Props {
  queryParams: queryString.ParsedQuery<string>
  currentPage: number
  totalPage: number
}

const RANGE = 2

export default function Pagination({ queryParams: _queryParams, currentPage, totalPage }: Props) {
  function renderPageNumbers() {
    if (currentPage < RANGE * 2) {
      return Array.from(Array(RANGE * 2 + 2)).map((_, i) => {
        const pageNumber = i + 1
        if (pageNumber <= RANGE * 2 + 1) {
          return (
            <LinkButton
              key={i}
              to={PATH.PRODUCTS}
              className={cn(
                'medium-16 text-secondary1_light1 h-9 justify-center rounded-[4px] px-2 transition-colors flex-center hover:bg-secondary/50',
                {
                  'bg-secondary': pageNumber === currentPage,
                }
              )}
            >
              {pageNumber}
            </LinkButton>
          )
        }

        return <span key={i}>...</span>
      })
    } else {
      return Array.from(Array(RANGE * 2 + 4)).map((_, i) => {
        const pageNumber = i + currentPage - RANGE - 2

        if (i === 0) {
          return (
            <LinkButton
              key={i}
              to={PATH.PRODUCTS}
              className="medium-16 text-secondary1_light1 h-9 justify-center rounded-[4px] px-2 transition-colors flex-center hover:bg-secondary/50"
            >
              1
            </LinkButton>
          )
        } else if (pageNumber === currentPage - RANGE - 1) {
          return <span key={i}>...</span>
        } else if (pageNumber >= currentPage - RANGE && pageNumber <= currentPage + RANGE && pageNumber <= totalPage) {
          return (
            <LinkButton
              key={i}
              to={PATH.PRODUCTS}
              className={cn(
                'medium-16 text-secondary1_light1 h-9 justify-center rounded-[4px] px-2 transition-colors flex-center hover:bg-secondary/50',
                {
                  'bg-secondary': pageNumber === currentPage,
                }
              )}
            >
              {pageNumber}
            </LinkButton>
          )
        } else if (pageNumber < totalPage - RANGE && pageNumber === currentPage + RANGE + 1) {
          return <span key={i}>...</span>
        }
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
