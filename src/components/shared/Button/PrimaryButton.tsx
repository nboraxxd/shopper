import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export default function PrimaryButton({ children, className, ...rest }: Props) {
  return (
    <button className={cn('focus-primary transition-colors', className)} {...rest}>
      {children}
    </button>
  )
}
