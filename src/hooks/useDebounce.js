import { useRef, useState } from 'react'

export default function useDebounce(defaultValue, delay = 300) {
  const [value, _setValue] = useState(defaultValue)
  const timerRef = useRef()

  function setValue(value) {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      _setValue(value)
    }, delay)
  }

  return [value, setValue]
}
