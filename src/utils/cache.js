export const localStorageCache = {
  // expired = cacheTime được truyền vào + timestamp ngay lúc function thực thi, expired sẽ được tính sẵn trước khi truyền vào hàm set
  set(name, data, expired) {
    const storeData = { data, expired }
    localStorage.setItem(name, JSON.stringify(storeData))
  },
  get(name) {
    const storeData = JSON.parse(localStorage.getItem(name))
    if (storeData) {
      const now = Date.now()
      // Nếu expired có trong storeData và timestamp của expired - timestamp hiện tại > 0
      // Tức là thời gian hiện tại chưa vượt quá thời gian của expired, hay nói cách khác là data chưa hết hạn thì sẽ trả về data của storeData
      if (storeData.expired && storeData.expired - now >= 0) {
        return storeData.data
      }
    }
  },
  remove(name) {
    localStorage.removeItem(name)
  },
}

export const sessionStorageCache = {
  // expired = cacheTime được truyền vào + timestamp ngay lúc function thực thi, expired sẽ được tính sẵn trước khi truyền vào hàm set
  set(name, data, expired) {
    const storeData = { data, expired }
    sessionStorage.setItem(name, JSON.stringify(storeData))
  },
  get(name) {
    const storeData = JSON.parse(sessionStorage.getItem(name))
    if (storeData) {
      const now = Date.now()
      // Nếu expired có trong storeData và timestamp của expired - timestamp hiện tại > 0
      // Tức là thời gian hiện tại chưa vượt quá thời gian của expired, hay nói cách khác là data chưa hết hạn thì sẽ trả về data của storeData
      if (storeData.expired && storeData.expired - now >= 0) {
        return storeData.data
      }
    }
  },
  remove(name) {
    sessionStorage.removeItem(name)
  },
}
