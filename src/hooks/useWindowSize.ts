import { useLayoutEffect, useState } from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState<{ windowWidth: number; windowHeight: number }>({
    windowWidth: 0,
    windowHeight: 0,
  })

  useLayoutEffect(() => {
    const handler = () => {
      setSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    }

    handler()
    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return size
}
