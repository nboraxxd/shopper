const USER_PATH = '/ca-nhan'

export const PATH = {
  homePage: '/',
  products: '/san-pham',
  productDetail: '/:slug',
  category: '/:slug/:id',
  signIn: '/signin',
  user: {
    index: USER_PATH,
    order: USER_PATH + '/don-hang',
    wishList: USER_PATH + '/san-pham-yeu-thich',
    address: USER_PATH + '/so-dia-chi',
    payment: USER_PATH + '/so-thanh-toan',
  },
  page404: '*',
}
