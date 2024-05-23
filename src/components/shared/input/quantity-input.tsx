import { useState } from 'react'

import { MinusIcon, PlusIcon } from '@/components/icons'
import { PrimaryButton } from '@/components/shared/button'
import { NumberInput, NumberInputProps } from '@/components/shared/input'

interface Props extends NumberInputProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
}

export default function QuantityInput({ max, onIncrease, onDecrease, onType, value, ...rest }: Props) {
  const [localValue, setLocalValue] = useState(Number(value) || 1)

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let _value = ev.target.value

    if (_value.length > 3) return

    if (max && Number(_value) > max) {
      _value = max.toString()
    } else if (_value === '0') {
      _value = '1'
    }

    onType?.(Number(_value))
    setLocalValue(Number(_value))
  }

  const handleIncrease = () => {
    const newValue = Math.min(Number(value || localValue) + 1, max || Infinity)
    onIncrease?.(newValue)
    setLocalValue(newValue)
  }

  const handleDecrease = () => {
    const newValue = Math.max(Number(value || localValue) - 1, 1)
    onDecrease?.(newValue)
    setLocalValue(newValue)
  }

  return (
    <div className="input-ring text-secondary1_dark3 mt-5 h-11 w-fit rounded-[10px] border border-secondary-3 px-5 flex-center">
      <PrimaryButton noFocus tabIndex={-1} onClick={handleDecrease}>
        <MinusIcon className="size-6" />
      </PrimaryButton>
      <NumberInput
        className="background-light2_dark1 medium-15 h-11 w-[3.25rem] px-2.5 text-center"
        noFocus
        type="text"
        inputMode="numeric"
        maxLength={3}
        value={value || localValue}
        onChange={handleChange}
        onBlur={() => (!value && onType?.(1)) || (!localValue && setLocalValue(1))}
        {...rest}
      />
      <PrimaryButton noFocus tabIndex={-1} onClick={handleIncrease}>
        <PlusIcon className="size-6" />
      </PrimaryButton>
    </div>
  )
}
