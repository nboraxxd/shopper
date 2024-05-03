import { useCallback, useLayoutEffect, useState } from 'react'

type State = {
  x: number | null
  y: number | null
}

export default function useWindowScroll(): [State, typeof scrollTo] {
  const [state, setState] = useState<State>({
    x: null,
    y: null,
  })

  const scrollTo = useCallback((...args: [ScrollToOptions] | [number, number]) => {
    if (typeof args[0] === 'object') {
      window.scrollTo(args[0])
    } else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
      window.scrollTo(args[0], args[1])
    } else {
      throw new Error('Invalid arguments passed to scrollTo')
    }
  }, [])

  useLayoutEffect(() => {
    const handleScroll = () => {
      setState({
        x: window.scrollX,
        y: window.scrollY,
      })
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return [state, scrollTo]
}
