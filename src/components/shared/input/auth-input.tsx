import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/utils'

interface Props extends ComponentPropsWithoutRef<'input'> {
  wrapperClassname?: string
  inputClassname?: string
  Icon?: (props: React.ComponentPropsWithoutRef<'svg'>) => JSX.Element
  errorMessage?: string
}

export default function AuthInput({ wrapperClassname, inputClassname, Icon, errorMessage, ...rest }: Props) {
  return (
    <div className={cn('', wrapperClassname)}>
      <div className="border-secondary3_dark3 h-12 rounded-[10px] border-[1.5px] px-3 transition-colors flex-center focus-within:border-secondary">
        <input
          {...rest}
          className={cn(
            'medium-16 sm:medium-18 placeholder:text-secondary3_dark3 no-focus size-full border-none bg-inherit p-0',
            inputClassname
          )}
        />
        {Icon && <Icon className="ml-3" />}
      </div>
      <p className="medium-14 my-1 min-h-7 text-left text-primary-red">{errorMessage}</p>
    </div>
  )
}
