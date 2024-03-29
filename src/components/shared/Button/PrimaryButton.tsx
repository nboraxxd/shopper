import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/utils'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

const PrimaryButton = forwardRef<HTMLButtonElement, Props>(({ children, className, ...props }, ref) => {
  return (
    <button ref={ref} className={cn('focus-primary', className)} {...props}>
      {children}
    </button>
  )
})

export default PrimaryButton
