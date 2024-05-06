import { cn } from '@/utils'
import { ComponentPropsWithRef, forwardRef } from 'react'

interface Props extends ComponentPropsWithRef<'input'> {}

const NumberInput = forwardRef<HTMLInputElement, Props>(({ className, onChange, ...rest }, ref) => {
  function handleOnChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { value } = ev.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(ev)
    }
  }

  return (
    <input
      className={cn(
        'input-ring background-light1_dark2 h-9 w-full rounded-md border-none px-2 py-0 shadow-sm flex-center placeholder:text-secondary-3 dark:placeholder:text-dark-3/40 lg:w-[121px]',
        className
      )}
      onChange={handleOnChange}
      ref={ref}
      {...rest}
    />
  )
})

export default NumberInput
