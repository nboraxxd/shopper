import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/utils'

interface Props extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  className?: string
  isLoading?: boolean
}

export default function ButtonWithLoading({ children, className, isLoading, disabled, ...rest }: Props) {
  return (
    <button
      className={cn(
        'focus-primary line-clamp-1 justify-center gap-2 whitespace-nowrap flex-center disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <span className="inline-block size-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
          <span className="sr-only">Loading...</span>
        </span>
      )}
      {children}
    </button>
  )
}
