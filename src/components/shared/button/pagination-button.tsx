import { ComponentPropsWithoutRef } from 'react'
import { Link, To } from 'react-router-dom'

import { cn } from '@/utils'
import { LinkButton } from '@/components/shared/button'

interface Props extends ComponentPropsWithoutRef<typeof Link> {
  to: To
  className?: string
  currentPage?: number
  children?: React.ReactNode
}

export default function PaginationButton({ to, className, currentPage, children }: Props) {
  return (
    <LinkButton
      to={to}
      className={cn(
        'medium-14 md:medium-16 text-secondary1_light1 h-7 justify-center rounded-[4px] px-2.5 transition-colors flex-center hover:opacity-100 md:h-9 md:min-w-9 md:px-3',
        children !== undefined && currentPage !== undefined && children === currentPage
          ? 'bg-secondary text-dark-1'
          : 'hover:bg-secondary/50',
        className
      )}
    >
      {children}
    </LinkButton>
  )
}
