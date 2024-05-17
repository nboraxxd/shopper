import { cn } from '@/utils'
import { ComponentPropsWithRef, forwardRef } from 'react'

interface Props extends ComponentPropsWithRef<'input'> {
  noFocus?: boolean
}

const NumberInput = forwardRef<HTMLInputElement, Props>(({ className, onChange, noFocus = false, ...rest }, ref) => {
  function handleOnChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { value } = ev.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(ev)
    }
  }

  return (
    <input
      className={cn(
        'border-none py-0 flex-center placeholder:text-secondary-3 dark:placeholder:text-dark-3/40',
        noFocus ? 'no-focus' : 'input-ring',
        className
      )}
      onChange={handleOnChange}
      ref={ref}
      {...rest}
    />
  )
})

export default NumberInput
