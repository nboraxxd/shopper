import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/utils'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props<T extends string> extends ComponentPropsWithoutRef<'input'> {
  register?: UseFormRegisterReturn<T>
  wrapperClassname?: string
  inputClassname?: string
  Icon?: (props: React.ComponentPropsWithoutRef<'svg'>) => JSX.Element
  errorMessage?: string
}

export default function AuthInput<T extends string>(props: Props<T>) {
  const { register, wrapperClassname, inputClassname, Icon, errorMessage, ...rest } = props

  return (
    <div className={wrapperClassname}>
      <div className="input-ring flex-center h-12 rounded-xl px-3 shadow-section">
        <input
          {...rest}
          {...register}
          className={cn(
            'text-secondary1_light1 placeholder:text-secondary3_dark3 no-focus relative -z-0 size-full border-none bg-inherit p-0 text-medium-16 sm:text-medium-18',
            inputClassname
          )}
        />
        {Icon && <Icon className="ml-3 size-6" />}
      </div>
      <p className="mb-1.5 mt-0.5 min-h-5 text-left text-medium-12 text-primary-red sm:min-h-6 sm:text-medium-14">
        {errorMessage}
      </p>
    </div>
  )
}
