import { cn } from '@/utils'
import { ComponentPropsWithRef, forwardRef, useState } from 'react'

export interface NumberInputProps extends ComponentPropsWithRef<'input'> {
  noFocus?: boolean
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onChange, noFocus = false, value = '', ...rest }, ref) => {
    const [localValue, setLocalValue] = useState<string>(value as string)

    function handleOnChange(ev: React.ChangeEvent<HTMLInputElement>) {
      const { value } = ev.target
      if (/^\d+$/.test(value) || value === '') {
        onChange && onChange(ev)

        setLocalValue(value)
      }
    }

    return (
      <input
        className={cn(
          'flex-center border-none py-0 placeholder:text-secondary-3 dark:placeholder:text-dark-3/40',
          noFocus ? 'no-focus' : 'input-ring',
          className
        )}
        onChange={handleOnChange}
        value={value || localValue}
        ref={ref}
        {...rest}
      />
    )
  }
)

export default NumberInput
