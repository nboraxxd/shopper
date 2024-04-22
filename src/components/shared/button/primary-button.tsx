import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/utils'

interface Props extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  className?: string
}

export default function PrimaryButton({ children, className, ...props }: Props) {
  return (
    <button className={cn('focus-primary', className)} {...props}>
      {children}
    </button>
  )
}
