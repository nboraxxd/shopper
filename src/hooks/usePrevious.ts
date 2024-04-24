import { useState } from 'react'

export default function usePrevious<T>(value: T) {
  const [current, setCurrent] = useState(value)
  const [previous, setPrevious] = useState<null | T>(null)

  if (value !== current) {
    setPrevious(current)
    setCurrent(value)
  }

  return previous
}
