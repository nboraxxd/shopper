import { Link, To } from 'react-router-dom'

import { cn } from '@/utils'
import { ChevronRightIcon } from '@/components/icons'

interface BreadcrumbsProps {
  children: React.ReactNode
  navClassname?: string
}

export default function Breadcrumbs({ children, navClassname }: BreadcrumbsProps) {
  return (
    <nav className={cn('background-light1_dark1 rounded-[20px] md:rounded-[10px]', navClassname)}>
      <ol role="list" className="min-h-14 gap-3 p-4 flex-center max-md:flex-wrap md:min-h-16 md:p-5">
        {children}
      </ol>
    </nav>
  )
}

interface BreadCrumbProps {
  children: React.ReactNode
  isLastChild?: boolean
  to?: To
  className?: string
}

Breadcrumbs.Item = ({ children, to, isLastChild = false, className }: BreadCrumbProps) => {
  return (
    <li
      className={cn('last:text-secondary1_light1 medium-12 md:medium-14 text-secondary-2', className, {
        'flex-center': !isLastChild,
      })}
    >
      {!isLastChild && to ? (
        <Link to={to} className="line-clamp-1">
          {children}
        </Link>
      ) : (
        <span className="line-clamp-1">{children}</span>
      )}
      {!isLastChild ? <ChevronRightIcon className="ml-1.5 size-4 text-secondary-2 md:ml-2 md:size-5" /> : null}
    </li>
  )
}
