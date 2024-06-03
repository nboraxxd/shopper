import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/utils'

interface Props extends ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode
  className?: string
}

const LinkButton = forwardRef<HTMLAnchorElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <Link
      className={cn('focus-primary line-clamp-1 whitespace-nowrap transition-opacity hover:opacity-85', className)}
      {...rest}
      ref={ref}
    >
      {children}
    </Link>
  )
})

export default LinkButton
