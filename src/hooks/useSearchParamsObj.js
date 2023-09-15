import { useSearchParams } from 'react-router-dom'

export default function useSearchParamsObj() {
  const [searchParams] = useSearchParams()

  return Object.fromEntries([...searchParams])
}
