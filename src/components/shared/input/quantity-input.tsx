import { useState } from 'react'

import { MinusIcon, PlusIcon } from '@/components/icons'
import { PrimaryButton } from '@/components/shared/button'
import { NumberInput, NumberInputProps } from '@/components/shared/input'
import { cn } from '@/utils'

interface Props extends Omit<NumberInputProps, 'className'> {
  wrapperClassName?: string
  inputClassName?: string
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
}

export default function QuantityInput(props: Props) {
  const {
    wrapperClassName,
    inputClassName,
    max,
    onIncrease,
    onDecrease,
    onType,
    onFocusOut,
    value,
    disabled,
    ...rest
  } = props

  const [localValue, setLocalValue] = useState(Number(value) || 1)

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let _value = ev.target.value

    if (_value.length > 3 || max === 0) return

    if (max && Number(_value) > max) {
      _value = max.toString()
    } else if (_value === '0') {
      _value = '1'
    }

    onType?.(Number(_value))
    setLocalValue(Number(_value))
  }

  const handleIncrease = () => {
    if (max === 0) return

    const newValue = Math.min(Number(value || localValue) + 1, (max && max > 999 ? 999 : max) || Infinity)
    onIncrease?.(newValue)
    setLocalValue(newValue)
  }

  const handleDecrease = () => {
    if (max === 0) return

    const newValue = Math.max(Number(value || localValue) - 1, 1)
    onDecrease?.(newValue)
    setLocalValue(newValue)
  }

  const handleBlur = () => {
    if (!value) {
      onType?.(1)
    }

    if (!localValue) {
      setLocalValue(1)
    }

    onFocusOut?.(Number(value || localValue))
  }

  return (
    <div
      className={cn(
        'input-ring text-secondary1_dark3 h-11 w-fit rounded-[10px] px-5 flex-center dark:ring-secondary-2',
        wrapperClassName
      )}
    >
      <PrimaryButton
        noFocus
        tabIndex={-1}
        onClick={handleDecrease}
        disabled={max === 0 || disabled}
        className="transition-opacity disabled:opacity-50"
      >
        <MinusIcon className="size-6" />
      </PrimaryButton>
      <NumberInput
        className={cn(
          'medium-16 h-full w-[3.25rem] bg-transparent px-2.5 text-center transition-opacity disabled:opacity-50',
          inputClassName
        )}
        noFocus
        type="text"
        inputMode="numeric"
        maxLength={3}
        value={value || localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={max === 0 || disabled}
        {...rest}
      />
      <PrimaryButton
        noFocus
        tabIndex={-1}
        onClick={handleIncrease}
        disabled={max === 0 || disabled}
        className="transition-opacity disabled:opacity-50"
      >
        <PlusIcon className="size-6" />
      </PrimaryButton>
    </div>
  )
}
