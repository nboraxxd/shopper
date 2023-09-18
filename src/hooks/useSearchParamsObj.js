import { useSearchParams } from 'react-router-dom'

// Custom hook này dùng để chuyển searchParams của useSearchParams thành object
// Object đó sẽ có dạng là { page: pageValue, limit: limitValue, sort: sortValue }
// Nếu không có searchParams trên URL thì kết quả trả về sẽ là {}
export default function useSearchParamsObj() {
  const [searchParams] = useSearchParams()

  return Object.fromEntries([...searchParams])
}
