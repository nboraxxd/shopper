import { useEffect, useRef, useState } from 'react'
import { localStorageCache, sessionStorageCache } from '@/utils/cache'
import { SERVICE_STATUS } from '@/config/serviceStatus'
import { CanceledError } from 'axios'

const _asyncFunction = {
  // key: Promise,
}

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
  keepPreviousData = false, // Dùng để quyết định có lưu lại data trong dataRef hay không? Đi kèm là phải có queryKey
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

  // Tạo AbortController trong useQuery. Để giá trị mặc định new AbortController() để lần đầu tiên khi chưa có request nào được thực thi thì controllerRef.current.abort không gây ra lỗi.
  const controllerRef = useRef(new AbortController())

  // Thoát page mà request chưa hoàn thành thì gọi abort trong controllerRef để cancel request còn dang dở
  useEffect(() => {
    return () => {
      controllerRef.current.abort()
    }
  }, [])

  useEffect(() => {
    function setCacheDataOrPreviousData(data) {
      // Nếu có cacheName (tức queryKey) và keepPreviousData thì mới lưu data vào trong dataRef
      if (cacheName && keepPreviousData === true) {
        dataRef.current[cacheName] = data
      }

      if (cacheName && cacheTime) {
        // Nếu có cacheName && cacheTime thì expired sẽ bằng expired + Date.now()
        const expired = cacheTime + Date.now()
        // Làm vậy để truyền expired vào trong cache.set như một argument
        cache.set(cacheName, data, expired)
      }
    }

    // Function này dùng để lấy data từ storeDriver hoặc dataRef
    function getCacheDataOrPreviousData() {
      // Kiểm tra nếu có queryKey (tức là cacheName)
      if (cacheName) {
        // Kiểm tra keepPreviousData là true và dataRef.current[cacheName] có giá trị thì lấy giá trị của dataRef.current[cacheName]
        if (keepPreviousData === true && dataRef.current[cacheName]) {
          return dataRef.current[cacheName]
        }

        // Lần gọi API đầu tiên thì sẽ không thể chạy vào điều kiện này vì khi đó _asyncFunction chỉ là {}
        if (_asyncFunction[cacheName]) {
          return _asyncFunction[cacheName]
        }

        // Lấy data từ storeDriver ra
        return cache.get(cacheName)
      }
    }

    async function fetchData() {
      // Mỗi lần fetchData thực thi chúng ta sẽ gọi abort trong controllerRef để cancel request cũ đi
      // Nếu không để giá trị mặc định lúc khởi tạo controllerRef thì phải kiểm tra controllerRef.current có giá trị hay không. Có giá trị thì mới tiến hành gọi đến abort để không gây ra lỗi. Trong trường hợp này đã có giá trị mặc định.
      // Khi fetchData được gọi lần đầu tiên thì abort sẽ là new AbortController() mà chưa được gán vào axios nên nó không có ý nghĩa gì
      // Từ lần gọi thứ 2 controllerRef.current được gán vào axios nên khi abort được gọi thì request trước đó sẽ bị huỷ
      controllerRef.current.abort()
      // Gán lại controllerRef.current
      // Tạo new AbortController() mới để gắn vào axios
      controllerRef.current = new AbortController()

      try {
        setStatus(SERVICE_STATUS.pending)

        let response = getCacheDataOrPreviousData()

        // Sau khi đã lấy data từ trong cache hoặc dataRef ra thì kiểm tra lại response
        // Nếu response vẫn không có data thì gọi hàm queryFn để lấy dữ liệu từ server
        if (Boolean(response) === false) {
          response = queryFn({ signal: controllerRef.current.signal })

          if (cacheName) {
            _asyncFunction[cacheName] = response
          }
        }

        if (response instanceof Promise) {
          response = await response
        }

        setData(response)
        setStatus(SERVICE_STATUS.successful)

        // set response vào trong storeDriver và dataRef
        setCacheDataOrPreviousData(response)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        // Kiểm tra err có phải do huỷ request không
        // có thể thay thế err instanceof CanceledError bằng axios.isCancel(err)
        if (err instanceof CanceledError) {
          // set lại status bằng pending để không mất loading
          setStatus(SERVICE_STATUS.idle)
        } else {
          setError(err)
          setStatus(SERVICE_STATUS.rejected)
        }
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

// Cancel request in useQuery
// Cancel request trong axios. https://axios-http.com/docs/cancellation

// Trường hợp user thoát ra khỏi page trước khi fetch API thành công.
// Trường hợp user thay đổi page liên tục trong products page dẫn đến API getProducts bị gọi liên tục. Mà thời gian đợi để trả về response của từng lần gọi API là khác nhau nên có thể response cuối cùng không phải là cái chúng ta mong muốn.
// Ví dụ nếu user chuyển liên tục từng trang, từ trang 1 đến trang 10. Những lần gọi API getProducts của trang 7 hoặc 8 có thể xong sau lần gọi API getProducts của trang 10. Việc này có thể dẫn đến sai lệch response cuối cùng mà chúng ta nhận được.
