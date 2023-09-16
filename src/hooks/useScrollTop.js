import { useEffect } from 'react'

export default function useScrollTop(dependencyList = []) {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList)
}
