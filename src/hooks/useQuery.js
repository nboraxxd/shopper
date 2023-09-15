import { useEffect, useState } from 'react'
import { localStorageCache, sessionStorageCache } from '@/utils/cache'
import { SERVICE_STATUS } from '@/config/serviceStatus'

// _cache sẽ đại diện cho localStorageCache hoặc sessionStorageCache
const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
}

export default function useQuery(options = {}) {
  const {
    queryFn, // Function dùng để gọi API
    queryKey, // Tên key để lưu trữ data trong cache
    cacheTime, // Thời gian data tồn tại trong cache
    enabled = true, // Dùng để quyết định có thực thi queryFn hay không? Mặc định là true
    storeDriver = 'sessionStorage', // Dùng để quyết định nơi lưu trữ data. Mặc định là sessionStorage
  } = options

  // Quyết định cache sẽ là localStorageCache hay sessionStorageCache
  const cache = _cache[storeDriver]

  const [data, setData] = useState(null) // Dùng state để giữ data của queryFn
  const [status, setStatus] = useState(SERVICE_STATUS.idle)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        setStatus(SERVICE_STATUS.pending)

        let response
        // Nếu có queryKey thì lấy data từ cache ra
        if (queryKey) {
          response = cache.get(queryKey)
        }

        // Sau khi đã lấy data từ trong cache ra thì kiểm tra lại response
        // Nếu response vẫn không có data thì gọi hàm queryFn để lấy dữ liệu từ server
        if (Boolean(response) === false) {
          response = await queryFn()
        }

        setData(response)
        setStatus(SERVICE_STATUS.successful)

        if (queryKey) {
          let expired = cacheTime
          // Kiểm tra nếu có cacheTime thì expired sẽ bằng expired + Date.now()
          // Làm vậy để truyền expired vào trong cache.set như một argument
          if (cacheTime) {
            expired = expired + Date.now()
          }

          cache.set(queryKey, response, expired)
        }
      } catch (err) {
        setError(err)
        setStatus(SERVICE_STATUS.rejected)
      }
    }

    if (enabled === true) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache, cacheTime, enabled, queryKey])

  return {
    data,
    status,
    error,
  }
}
