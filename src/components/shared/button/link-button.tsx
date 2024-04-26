import { cn } from '@/utils'
import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

interface Props extends ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode
  className?: string
}

export default function LinkButton({ children, className: className, ...rest }: Props) {
  return (
    <Link
      className={cn('focus-primary line-clamp-1 whitespace-nowrap transition-opacity hover:opacity-85', className)}
      {...rest}
    >
      {children}
    </Link>
  )
}
