import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'
import { cn } from '@/utils'

interface Props extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  className?: string
}

const PrimaryButton = forwardRef<HTMLButtonElement, Props>(({ children, className, ...props }, ref) => {
  return (
    <button ref={ref} className={cn('focus-primary line-clamp-1 whitespace-nowrap', className)} {...props}>
      {children}
    </button>
  )
})

export default PrimaryButton
