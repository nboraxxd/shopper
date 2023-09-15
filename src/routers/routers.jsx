import { PATH } from '@/config'
import { MainLayout } from '@/layouts/MainLayout'
import { Page404 } from '@/pages/404'
import { HomePage } from '@/pages/HomePage'
import { ProductDetail } from '@/pages/ProductDetail'
import { Products } from '@/pages/Products'
import { user } from '@/routers/user.router'
import { GuestRouter, PrivateRouter } from '@/routers'
import { guest } from '@/routers/guest.router'

export const routers = [
  {
    path: PATH.homePage,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: PATH.category,
        element: <ProductDetail />,
      },

      {
        path: PATH.products,
        element: <Products />,
      },

      {
        path: PATH.productDetail,
        element: <ProductDetail />,
      },

      {
        element: <PrivateRouter />,
        children: [user],
      },

      {
        element: <GuestRouter />,
        children: guest,
      },

      {
        path: PATH.page404,
        element: <Page404 />,
      },
    ],
  },
]
