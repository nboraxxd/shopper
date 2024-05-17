import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'
import { cn } from '@/utils'

interface Props extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  noFocus?: boolean
}

const PrimaryButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, noFocus = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('line-clamp-1 whitespace-nowrap', noFocus ? 'no-focus' : 'focus-primary', className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default PrimaryButton
