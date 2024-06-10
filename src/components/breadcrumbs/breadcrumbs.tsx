import { Link, To } from 'react-router-dom'

import { cn } from '@/utils'
import { ChevronRightIcon } from '@/components/icons'

interface BreadcrumbsProps {
  children: React.ReactNode
  navClassname?: string
}

export default function Breadcrumbs({ children, navClassname }: BreadcrumbsProps) {
  return (
    <nav className={cn('rounded-3xl bg-breadcrumb md:rounded-xl', navClassname)}>
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
      className={cn('medium-12 md:medium-14 text-breadcrumb-foreground last:text-breadcrumb-last', className, {
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
      {!isLastChild ? (
        <ChevronRightIcon className="ml-1.5 size-4 text-breadcrumb-foreground md:ml-2 md:size-5" />
      ) : null}
    </li>
  )
}
