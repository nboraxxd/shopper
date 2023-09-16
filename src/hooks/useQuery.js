import { useEffect, useRef, useState } from 'react'
import { localStorageCache, sessionStorageCache } from '@/utils/cache'
import { SERVICE_STATUS } from '@/config/serviceStatus'

// _cache sẽ đại diện cho localStorageCache hoặc sessionStorageCache
const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
}

export default function useQuery({
  queryFn, // Function dùng để gọi API
  queryKey, // Tên key để lưu trữ data trong storeDriver
  cacheTime, // Thời gian data tồn tại trong storeDriver, tính theo ms
  enabled = true, // Dùng để quyết định có thực thi queryFn hay không? Mặc định là true
  keepPreviousData = false,
  storeDriver = 'sessionStorage', // Dùng để quyết định nơi lưu trữ data. Mặc định là sessionStorage
} = {}) {
  // Quyết định cache sẽ là localStorageCache hay sessionStorageCache
  const cache = _cache[storeDriver]

  // Tên key để lưu trữ data trong storeDriver
  const cacheName = Array.isArray(queryKey) ? queryKey[0] : queryKey

  // data sẽ được lấy từ dataRef hoặc response của queryFn
  const [data, setData] = useState(null) // Dùng state để giữ data của queryFn
  const [status, setStatus] = useState(SERVICE_STATUS.idle)
  const [error, setError] = useState()

  // dataRef sẽ giữ giá trị của data cũ
  // dataRef.current sẽ có dạng { key:... }
  const dataRef = useRef({})

  useEffect(() => {
    function setCacheDataOrPreviousData(data) {
      if (keepPreviousData === true) {
        dataRef.current[cacheName] = data
      }

      if (cacheName && cacheTime) {
        // Nếu có cacheName && cacheTime thì expired sẽ bằng expired + Date.now()
        const expired = cacheTime + Date.now()
        // Làm vậy để truyền expired vào trong cache.set như một argument

        cache.set(queryKey, data, expired)
      }
    }

    // Function này dùng để lấy data từ storeDriver hoặc dataRef
    function getCacheDataOrPreviousData() {
      // Kiểm tra keepPreviousData là true và dataRef.current[cacheName] có giá trị thì lấy giá trị của dataRef.current[cacheName]
      if (keepPreviousData === true && dataRef.current[cacheName]) {
        return dataRef.current[cacheName]
      }

      // Kiểm tra nếu có queryKey thì lấy data từ storeDriver ra
      if (cacheName) {
        return cache.get(queryKey)
      }
    }

    async function fetchData() {
      try {
        setStatus(SERVICE_STATUS.pending)

        let response = getCacheDataOrPreviousData()

        // Sau khi đã lấy data từ trong cache hoặc dataRef ra thì kiểm tra lại response
        // Nếu response vẫn không có data thì gọi hàm queryFn để lấy dữ liệu từ server
        if (Boolean(response) === false) {
          response = await queryFn()
        }

        setData(response)
        setStatus(SERVICE_STATUS.successful)

        // set response vào trong storeDriver và dataRef
        setCacheDataOrPreviousData(response)
      } catch (err) {
        setError(err)
        setStatus(SERVICE_STATUS.rejected)
      }
    }

    if (enabled === true) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache, cacheTime, enabled, keepPreviousData].concat(queryKey))

  return {
    data,
    status,
    error,
  }
}
