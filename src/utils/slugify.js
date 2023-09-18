/* Enhanced from: https://codepen.io/trongthanh/pen/rmYBdX */
export function slugify(str) {
  let slug = str

  // Chuyển hết sang chữ thường
  slug = slug.toLowerCase()

  // xóa dấu
  slug = slug
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  slug = slug.replace(/[đĐ]/g, 'd')

  // Xóa ký tự đặc biệt
  slug = slug.replace(/([^0-9a-z-\s])/g, '')

  // Xóa khoảng trắng thay bằng ký tự -
  slug = slug.replace(/(\s+)/g, '-')

  // Xóa ký tự - liên tiếp
  slug = slug.replace(/-+/g, '-')

  // xóa phần dư - ở đầu & cuối
  slug = slug.replace(/^-+|-+$/g, '')

  // return
  return slug
}
