import { PATH } from '@/config'
import { Link, createSearchParams } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'

const RANGE = 2
export default function Pagination({ searchParamsObj, totalPage, name = 'page' }) {
  const currentPage = Number(searchParamsObj[name]) || 1

  function handleChangePage(page) {
    return createSearchParams({
      ...searchParamsObj,
      [name]: page,
    }).toString()
  }

  function renderPagination() {
    // Kỹ thuật bật cờ hiệu
    let dotBefore = false
    let dotAfter = false

    function renderDotBefore(key) {
      if (dotBefore === false) {
        dotBefore = true
        return (
          <li key={key} className="page-item">
            <span className="page-link cursor-default">...</span>
          </li>
        )
      }
      return null
    }

    function renderDotAfter(key) {
      if (dotAfter === false) {
        dotAfter = true
        return (
          <li key={key} className="page-item">
            <span className="page-link cursor-default">...</span>
          </li>
        )
      }
      return null
    }

    return Array.from(Array(totalPage)).map((_, index) => {
      const pageNumber = index + 1

      // Điều kiện này để quyết định show DotBefore hoặc không show gì hết
      if (pageNumber < currentPage - RANGE) {
        return renderDotBefore(index)
      }

      // Điều kiện này để quyết định show DotAfter hoặc không show gì hết
      if (pageNumber > currentPage + RANGE && pageNumber > RANGE * 2 + 1) {
        return renderDotAfter(index)
      }

      return (
        <li key={index} className={twJoin('page-item', currentPage === pageNumber && 'active')}>
          <Link to={{ pathname: PATH.products, search: handleChangePage(pageNumber) }} className="page-link">
            {pageNumber}
          </Link>
        </li>
      )
    })
  }

  if (currentPage > totalPage) return null

  return (
    <ul className="pagination pagination-sm text-gray-400">
      <li className="page-item">
        {currentPage <= 1 ? (
          <span className="page-link page-link-arrow cursor-not-allowed opacity-50">
            <i className="fa fa-caret-left" />
          </span>
        ) : (
          <Link
            to={{ pathname: PATH.products, search: handleChangePage(currentPage - 1) }}
            className="page-link page-link-arrow"
          >
            <i className="fa fa-caret-left" />
          </Link>
        )}
      </li>
      {renderPagination()}
      <li className="page-item">
        {currentPage >= totalPage ? (
          <span className="page-link page-link-arrow cursor-not-allowed opacity-50">
            <i className="fa fa-caret-right" />
          </span>
        ) : (
          <Link
            to={{ pathname: PATH.products, search: handleChangePage(currentPage + 1) }}
            className="page-link page-link-arrow"
          >
            <i className="fa fa-caret-right" />
          </Link>
        )}
      </li>
    </ul>
  )
}
