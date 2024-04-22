import { ComponentPropsWithoutRef, ReactNode, useEffect, useState } from 'react'
import { cn, formatSecondsToMMSS } from '@/utils'

interface Props extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  timer: number
  triggerCountdown?: boolean
  className?: string
  isLoading?: boolean
}

export default function CountdownButton(props: Props) {
  const { children, timer, triggerCountdown, className, isLoading, disabled, ...rest } = props

  const [isWaiting, setIsWaiting] = useState(Boolean(triggerCountdown))
  const [countdown, setCountdown] = useState(timer)

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined
    if (isWaiting) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          const remainingSeconds = prevCountdown - 1
          if (remainingSeconds <= 0) {
            clearInterval(timer) // Stop the countdown when it reaches 0
            setIsWaiting(false)
          }

          return remainingSeconds
        })
      }, 1000)
    }

    return () => clearInterval(timer) // Cleanup timer when the component unmounts
  }, [isWaiting])

  useEffect(() => {
    if (triggerCountdown) {
      setIsWaiting(true)
      setCountdown(timer)
    }
  }, [timer, triggerCountdown])

  return (
    <button
      className={cn(
        'focus-primary line-clamp-1 justify-center gap-2 whitespace-nowrap flex-center disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      disabled={disabled || isLoading || isWaiting}
      {...rest}
    >
      {isLoading && (
        <span className="inline-block size-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
          <span className="sr-only">Loading...</span>
        </span>
      )}
      {children} {isWaiting ? `in ${formatSecondsToMMSS(countdown)}` : ''}
    </button>
  )
}
