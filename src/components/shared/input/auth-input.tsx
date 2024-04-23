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
    <div className={cn('', wrapperClassname)}>
      <div className="border-secondary3_dark3 h-12 rounded-[10px] border-[1.5px] px-3 transition-colors flex-center focus-within:border-secondary">
        <input
          {...rest}
          {...register}
          className={cn(
            'medium-16 sm:medium-18 placeholder:text-secondary3_dark3 no-focus size-full border-none bg-inherit p-0',
            inputClassname
          )}
        />
        {Icon && <Icon className="ml-3 size-6" />}
      </div>
      <p className="medium-12 sm:medium-14 mb-1.5 mt-0.5 min-h-5 text-left text-primary-red sm:min-h-6">
        {errorMessage}
      </p>
    </div>
  )
}
