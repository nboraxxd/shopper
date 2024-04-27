import { useCallback, useSyncExternalStore } from 'react'

type Width =
  | {
      minWidth?: number
      maxWidth: number
    }
  | {
      minWidth: number
      maxWidth?: number
    }
  | {
      minWidth: number
      maxWidth: number
    }

type Query =
  | `only screen and (max-width : ${string}px)`
  | `only screen and (min-width : ${string}px)`
  | `only screen and (min-width : ${string}px) and (max-width : ${string}px)`

export default function useMediaQuery({ minWidth, maxWidth }: Width): boolean {
  let query: Query
  if (minWidth && !maxWidth) {
    query = `only screen and (min-width : ${minWidth}px)`
  } else if (!minWidth && maxWidth) {
    query = `only screen and (max-width : ${maxWidth}px)`
  } else {
    query = `only screen and (min-width : ${minWidth}px) and (max-width : ${maxWidth}px)`
  }

  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener('change', callback)
      return () => {
        matchMedia.removeEventListener('change', callback)
      }
    },
    [query]
  )

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    throw new Error('useMediaQuery is a client-only hook')
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
